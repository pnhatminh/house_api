import express, { Request, Response } from "express";
import multer from "multer";
import csvParser from "csv-parser";
import * as fs from "fs";

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), validateCSVFile, (req, res) => {
	const houses: { [key: string]: boolean } = {};

	fs.createReadStream(req.file!.path)
		.pipe(csvParser())
		.on("data", (data) => {
			if (!Object.keys(data).length) return;
			const houseAddress = standardizeAddress(data.houseAddress);
			houses[houseAddress] = true;
		})
		.on("end", () => {
			console.log(houses);
			const uniqueHouses = Object.keys(houses).length;
			res.status(200).json({ uniqueHouses });
		});
});

function standardizeAddress(address: string): string {
	const tokens = address.toLowerCase().split(/\b\s+\b/);
	// Follow this guide to normalize address https://www.placekey.io/blog/how-to-standardize-address-data
	const directions = [
		"north",
		"west",
		"east",
		"south",
		"n",
		"w",
		"e",
		"s",
		"n.",
		"w.",
		"e.",
		"s.",
	];
	const streetSuffixes: { [key: string]: string } = {
		"st.": "street",
		st: "street",
		"ave.": "avenue",
		ave: "avenue",
		"rd.": "road",
		rd: "road",
		"blvd.": "boulevard",
		blvd: "boulevard",
		"dr.": "drive",
		dr: "drive",
		"ln.": "lane",
		ln: "lane",
		"ct.": "court",
		ct: "court",
		"pl.": "place",
		pl: "place",
		"sq.": "square",
		sq: "square",
		"ter.": "terrace",
		ter: "terrace",
		"pkwy.": "parkway",
		pkwy: "parkway",
	};
	const standardizedTokens = tokens.map((token) => {
		if (streetSuffixes[token]) return streetSuffixes[token];
		if (directions.includes(token)) return "";
		return token.replace(/[^\w\s]/gi, "");
	});
	const canonicalAddress = standardizedTokens.join(" ").trim();
	return canonicalAddress;
}

function validateCSVFile(req: Request, res: Response, next: Function) {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}
	if (!req.file.originalname.match(/\.(csv)$/)) {
		return res.status(400).send("Uploaded file is not a CSV.");
	}
	next();
}

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

export default app;
