# การติดตั้ง / การตั้งค่าเว็บไซต์
<b>สามารถอ่าน Preview README.md ได้ที่ [Repository](https://github.com/ISongwuts/ExerciseApp/blob/main/README.md) นี้ </b>

หลังจากที่คุณ clone repository หรือดาวน์โหลด repository นี้แล้ว กรุณาทำตามขั้นตอนต่อไปนี้:

## 1. ติดตั้งไฟล์ Setup ของ NodeJS และ git
- [NodeJS Setup](https://nodejs.org/en) (ใช้เวอร์ชัน LTS)
- [git](https://git-scm.com/) (ใช้เวอร์ชัน LTS)
  ตรวจสอบให้แน่ใจว่าได้ทำการติดตั้งอย่างถูกต้อง

## 2. เข้าไปยังไดเรกทอรี frontend และ backend
- เปิด Command Prompt / Terminal
- รันคำสั่ง `npm install` ในทั้งสองไดเรกทอรี
- เมื่อได้ทำการติดตั้งแพ็คเกจเรียบร้อยแล้ว ให้รันคำสั่ง `npm start` ในไดเรกทอรี backend และ `npm run dev` ในไดเรกทอรี frontend

### สามารถทำการทดสอบเส้นของ API ได้ที่ 
- `http://localhost:8000/api/[document]`

### ไฟล์ SQL อยู่ที่ 
- `./server/src/database/db.sql`

###        เมื่อต้องการเชื่อมต่อฐานข้อมูลแบบ Local สามารถทำได้โดยเปลี่ยน
- <i> user, host, password และ port </i> ที่ไฟล์ `.env` 
