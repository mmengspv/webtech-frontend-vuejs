# Midterm Project 
Deposit & Withdraw the moneys to gain point for trade rewards
## Team mates
- 6210402445 Thanapat Warunee
- 6210406734 Supavet Amornruksakul
- 6210406769 Itsaraphap Sakulwong

## The first to do everything 
you should go to the website [webtech backend strapi](https://github.com/mmengspv/webtech-backend-strapi)
and clone the website follow the recommendations on that repository.

## Project setup
```
npm install
npm install --save moment
```
### Compiles and hot-reloads for development
```
npm run serve
```

## How to use
---
### User
- หากยังไม่มีบัญชีผู้ใช้ให้กด Register ก่อน แล้วกรอกข้อมูลตามในหน้า Register ระบุไว้
- หากมีบัญชีแล้ว สามารถกด log in เข้ามาได้เลย
- การฝาก-ถอนเงิน
  - เข้าไปที่หน้า Deposit&withdraw แล้ว สามารถกดเพื่อทำการฝาก-ถอนเงินได้ แล้วจะแสดงประวัติออกมาในตาราง แต่เงินยังไม่ได้เข้าบัญชีต้องรอให้ admin เป็นคนปรับค่าเงินในระบบ
- การแลกของ
  - หน้าแลกของจะแสดงข้อมูลสินค้าที่สามารถแลกได้ กด use point แล้วแต้มจะหักออกจากบัญชีแล้วจะไปแสดงที่หน้า History 
### Admin
---
- เพิ่ม ลบของ
  - admin เพ่ิมของเข้าระบบแล้วจะนำข้อมูลตรงนี้ไปแสดงที่ user 
- การปรับค่าเงิน 
  - admin จะทำการปรับค่าเงิน user ที่เพิ่มมาในระบบแล้ว เงินจะกลับไปขึ้นที่บัญชีของ User โดยจะมีประวัติของ user ที่ทำการฝากหรือถอนเงินอยู่ในระบบด้วย
- ตารางแสดงคะแนน
  - แสดงประวัติการได้แต้ม ใช้แต้มของ user สามารถดูเป็นลำดับมากไปน้อยหรือน้อยไปมากได้ สามรถระบุเป็นช่วงเวลาได้
- การปรับแต้ม admin จะให้แต้มกับ user เป็นรางวัลลำดับต่างๆ ยิ่งมีเงินฝากเยอะยิ่งมีโอกาสได้รางวัลเยอะขึ้นตาม
 
    
