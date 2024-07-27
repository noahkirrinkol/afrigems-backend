import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";

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

const options: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

app.use(cors(options));

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
