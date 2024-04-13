import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes/routes";
import HttpException from "./models/HttpException";
import dotenv from "dotenv";
import CheckMatchId from "./jobs/CheckMatchId";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static(__dirname + "/assets"));

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ status: "API is running on /api" });
});

/* eslint-disable */
app.use(
  (
    err: Error | HttpException,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // @ts-ignore
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: "missing authorization credentials",
      });
      // @ts-ignore
    } else if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});

new CheckMatchId();
