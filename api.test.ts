import request from "supertest";
import app from "./index";

describe("POST /upload", () => {
	it("should return 400 if no file is uploaded", async () => {
		const res = await request(app).post("/upload");
		expect(res.status).toEqual(400);
		expect(res.text).toContain("No file uploaded.");
	});

	it("should return 400 if an invalid file is uploaded", async () => {
		const res = await request(app)
			.post("/upload")
			.attach("file", "./tests/invalid_file.txt");
		expect(res.status).toEqual(400);
		expect(res.text).toContain("Uploaded file is not a CSV.");
	});

	it("should return 200 if a valid CSV file is uploaded", async () => {
		const res = await request(app)
			.post("/upload")
			.attach("file", "./tests/valid_file.csv");
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ uniqueHouses: 3 });
	});
	
  it("should return uniqueHouses: 0 if an empty CSV file is uploaded", async () => {
		const res = await request(app)
			.post("/upload")
			.attach("file", "./tests/empty_file.csv");
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ uniqueHouses: 0 });
	});
});
