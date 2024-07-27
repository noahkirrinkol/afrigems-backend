import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "../config/db";
import appRoutes from "../routes/index";

dotenv.config();

const app: express.Application = express();

// Cross-Origin Resource Sharing
const allowedOrigins: string[] = [
  "https://afrigems-admin.vercel.app",
  "https://afrigems-frontend.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// db connection
connectDB();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

// Testing Route
app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Afrigems backend is working!" });
});

// routes
app.use("/api/v1", appRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
