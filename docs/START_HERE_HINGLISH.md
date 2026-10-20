# WanderAI — Bilkul Simple Setup Guide (Hindi/Hinglish)

Bhai, tension mat lo. Ye guide step-by-step hai. Coding expert hona zaroori nahi; bas steps follow karo.

## 1. Pehle ye 2 cheezein install karo
1. **Node.js LTS**: https://nodejs.org/ se LTS version install karo.
2. **Visual Studio Code**: https://code.visualstudio.com/ se install karo.

Install karne ke baad computer restart karna helpful ho sakta hai.

## 2. ZIP extract karo
- `WanderAI-Final-Year-Project-Ready.zip` par right-click karo.
- **Extract All** select karo.
- Jo `WanderAI` folder nikle, usko yaad rakhna.

## 3. Project open karo
- VS Code kholo.
- `File > Open Folder` par click karo.
- Extract kiya hua `WanderAI` folder select karo.
- VS Code ke menu se `Terminal > New Terminal` kholo.

## 4. Dependencies install karo (sirf pehli baar)
Terminal mein ye command likho aur Enter dabao:

```bash
npm install
```

Install complete hone do. Internet connection zaroori hai. Agar install error aaye, error ka screenshot apne guide/teacher ya mujhe bhej sakte ho.

## 5. Website chalao
Windows par project folder ke andar `start-windows.bat` par double-click kar sakte ho.
Ya VS Code terminal mein ye command chalao:

```bash
npm run dev:full
```

Terminal ko khula rehne do. Browser mein ye address kholo:

`http://localhost:5173`

Backend API ke liye doosra address:

`http://localhost:5000/api/health`

Agar health endpoint par JSON response aaye, server chal raha hai.

## 6. AI planner ke baare mein
- API key ke bina planner **demo/sample itinerary** bana sakta hai.
- Real AI responses ke liye OpenAI API key aur billing/credits ki zaroorat ho sakti hai.
- Project root mein `.env.example` ko copy karke `.env` naam do.
- `.env` mein `OPENAI_API_KEY=` ke baad apni key likho.
- **API key kabhi GitHub par upload mat karna.** `.gitignore` mein `.env` exclude hai. API key share/screenshot mein bhi mat dikhana.

## 7. Kaun se features check karne hain?
- Destination cards aur search.
- Category filters.
- Favourite/save destination.
- AI trip planner form.
- Itinerary generate karna.
- Itinerary save/open/delete/export (jo UI mein available ho).
- Mobile responsive layout.
- API health endpoint.

## 8. GitHub par upload karna
1. https://github.com par account banao/login karo.
2. `New repository` par click karo.
3. Repository name `WanderAI-Travel-Planner` rakh sakte ho.
4. Is project ka code upload karo. `.env` file upload **mat** karna.
5. README mein apna naam, college aur screenshots khud add karo.

Agar Git commands nahi aate, GitHub website par `Add file > Upload files` se project files upload kar sakte ho. `node_modules` upload mat karna.

## 9. Final-year submission se pehle
- Apna naam, roll number, department, college aur guide name report mein fill karo.
- Apne system par project run karke screenshots lo.
- Teacher ke required format ke hisaab se report edit karo.
- Viva questions ko samajh kar practice karo; sirf ratta mat maaro.
- Project ko apna samajhne ke liye code ke main parts explain karna seekho.

## Important honest note
Ye project ek substantial student project starter hai, lekin tumhare college ke rules ke hisaab se customization, local testing, screenshots, report details aur viva preparation tumhe karni hogi. Dependencies is environment mein download timeout ki wajah se independently build-test nahi ho paayi hain. Apne laptop par `npm install` aur `npm run build` run karke confirm karna.
