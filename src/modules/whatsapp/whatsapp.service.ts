import { Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService {
  private client: Client;

  constructor() {}

  initialize(userId: string) {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: `${userId}`,
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-extensions',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          //   "--single-process", // <- this one doesn't works in Windows
          '--disable-gpu',
        ],
      },
    });

    this.client.on('qr', (qr) => {
      console.log(qr);
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.enableMessageHandler();
      console.log('Client is ready!');
    });

    this.client.initialize();
  }

  private enableMessageHandler() {
    this.client.on('message', (message) => {
      const bodyLower = message.body.toLowerCase();

      switch (bodyLower) {
        case 'ping':
          message.reply('Pong');
          break;

        case 'hello':
        case 'halo':
          message.reply('Hi, Ada yang bisa dibantu?');
          break;

        case 'menu':
          const menuText =
            'Daftar Perintah:\n' +
            "1. ping - Mengirimkan balasan 'Pong'\n" +
            "2. hello - Menjawab dengan 'Hi, Ada yang bisa dibantu?'\n";
          message.reply(menuText);
          break;

        case 'otp':
          this.client.sendMessage(
            message.from,
            'LaundryQ - Berikut kode verifikasi OTP anda:\n' +
              `*123456*\n` +
              'RAHASIAKAN kode verifikasi dan abaikan jika anda tidak meminta kode verifikasi ini.',
          );
          break;

        default:
          message.reply('Hi, Ada yang bisa dibantu?');
          break;
      }
    });
  }

  logoutDevice() {
    this.client.logout();
  }

  create(createWhatsappDto: CreateWhatsappDto) {
    return 'This action adds a new whatsapp';
  }

  findAll() {
    return `This action returns all whatsapp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatsapp`;
  }

  update(id: number, updateWhatsappDto: UpdateWhatsappDto) {
    return `This action updates a #${id} whatsapp`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatsapp`;
  }
}
