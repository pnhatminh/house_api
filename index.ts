import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import * as fs from 'fs';

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const results: any[] = [];

    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log(results)
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
