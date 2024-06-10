import noble from '@abandonware/noble';
import fs from 'fs';
import axios, { AxiosRequestConfig } from 'axios';
import { trimIdent } from './trimIdent';
import { backoff } from './time';

// UUIDs for the service and characteristics
const SERVICE_UUID = '19b10000e8f2537e4f6cd104768a1214';
const IMAGE_CHARACTERISTIC_UUID = '19b10005e8f2537e4f6cd104768a1214';
const AUDIO_CHARACTERISTIC_UUID = '19b10001e8f2537e4f6cd104768a1214';


class bleCamera {
    public imageDescriptions: string[] = [];
    private previousChunk = -1;
    private buffer: Uint8Array = new Uint8Array(0);
    
    constructor() {
        noble.on('stateChange', state => {
            if (state === 'poweredOn') {
                console.log('Bluetooth is powered on. Starting scan...');
                noble.startScanning();
            } else {
                noble.stopScanning();
            }
        });

        noble.on('discover', peripheral => {
            if (peripheral.advertisement.localName !== "OpenGlass") {
                return;
            }
            console.log(`Found device: ${peripheral.advertisement.localName}`);
            noble.stopScanning();
            peripheral.connect(error => {
                if (error) {
                    console.error('Connection error:', error);
                    return;
                }
                console.log('Connected to', peripheral.advertisement.localName);
                peripheral.discoverServices([], (error, services) => {
                    if (error) {
                        console.error('Discover services error:', error);
                        return;
                    }
                    services.forEach(service => {
                        console.log('Discovered service:', service.uuid);
                        service.discoverCharacteristics([], (error, characteristics) => {
                            if (error) {
                                console.error('Discover characteristics error:', error);
                                return;
                            }
                            characteristics.forEach(characteristic => {
                                console.log('Discovered characteristic:', characteristic.uuid);
                                if (characteristic.uuid === IMAGE_CHARACTERISTIC_UUID) {
                                    characteristic.subscribe(error => {
                                        if (error) {
                                            console.error('Subscribe error:', error);
                                            return;
                                        }
                                        characteristic.on('data', data => {
                                            //console.log('Received image data:', data);
                                            const value = new Uint8Array(data.buffer);
                                            if (value[0] === 0xff && value[1] === 0xff) {
                                                this.onChunk(null, new Uint8Array());
                                            } else {
                                                const packetId = value[0] + (value[1] << 8);
                                                const packet = value.slice(2);
                                                this.onChunk(packetId, packet);
                                            }
                                        });
                                    })
                                }
                                /*characteristic.read((error, data) => {
                                    if (error) {
                                        console.error('Read error:', error);
                                        return;
                                    }
                                    console.log('Received data:', data);
                                });*/
                            });
                        });
                    });
                });
            });
        });
    }

    onChunk(id: number | null, data: Uint8Array) {
        if (this.previousChunk === -1) {
            if (id === null) {
                return;
            } else if (id === 0) {
                this.previousChunk = 0;
                this.buffer = new Uint8Array(0);
            } else {
                return;
            }
        } else {
            if (id === null) {
                console.log('Photo received', this.buffer);
                //this.saveImage(buffer)
                this.imageDescription(this.buffer).then(description => {
                    console.log('图片描述:', description);
                    this.imageDescriptions.push(description);
                });
                if (this.imageDescriptions.length > 3) {
                    this.imageDescriptions.shift();
                }
                this.previousChunk = -1;
                return;
            } else {
                if (id !== this.previousChunk + 1) {
                    this.previousChunk = -1;
                    console.error('Invalid chunk', id, this.previousChunk);
                    return;
                }
                this.previousChunk = id;
            }
        }

        // 追加数据
        this.buffer = new Uint8Array([...this.buffer, ...data]);
    }

    getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    }
    // 实现图像保存为图像文件
    async saveImage(data: Uint8Array) {
        fs.writeFile(this.getFormattedDate() + '.jpg', data, (error) => {
            if (error) {
                console.error('Error saving image:', error);
            } else {
                console.log('Image saved successfully.');
            }
        });
    }
    async imageDescription(src: Uint8Array): Promise<string> {
        // 定义请求体参数
        const args = {
            model: 'llava',
            messages: [
                {
                    role: 'system',
                    content: '你是一个非常先进的模型，你的任务是尽可能精确地描述图像。转录你看到的任何文本。',
                },
                {
                    role: 'user',
                    content: '用中文描述图上场景',
                    images: [src],
                },
            ],
        };

        let converted: { role: string, content: string, images?: string[] }[] = [];
        for (let message of args.messages) {
            converted.push({
                role: message.role,
                content: trimIdent(message.content),
                images: message.images ? message.images.map((image) => Buffer.from(image).toString('base64')) : undefined,
            });
        }
        try {
            // 发送请求并等待响应
            const response = await backoff<any>(async () => {
                // 创建一个axios实例
                const axiosInstance = axios.create();
                // 添加请求拦截器
            axiosInstance.interceptors.request.use(config => {
                config.httpsAgent = null;
                config.proxy = false;
                return config;
            }, error => {
                return Promise.reject(error);
            });
                const response = await axiosInstance.post("http://192.168.123.161:11434/api/chat", {
                    stream: false,
                    model: args.model,
                    messages: converted,
                });

                // 解析响应数据
                return response.data;
            });
            return trimIdent((response.message.content as string));
        } catch (error) {
            console.error('Error:', error);
            return '';
        }
    }
}


export const blecamera = new bleCamera();