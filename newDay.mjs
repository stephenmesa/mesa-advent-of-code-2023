import fs from 'fs';
import Mustache from 'mustache';

const dayNum = process.argv[2];

if (!dayNum) {
    console.error('Must supply day number argument');
    process.exit(1);
}

fs.writeFileSync(`./inputs/day${dayNum}-simple.txt`, Mustache.render(
    fs.readFileSync('./dayTemplate/day-simple.txt.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./inputs/day${dayNum}.txt`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.txt.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./day${dayNum}.mjs`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.mjs.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./day${dayNum}Driver.mjs`, Mustache.render(
    fs.readFileSync('./dayTemplate/dayXDriver.mjs.mustache', 'utf8'),
    { dayNumber: dayNum }
));

fs.writeFileSync(`./test/day${dayNum}.test.mjs`, Mustache.render(
    fs.readFileSync('./dayTemplate/day.test.mjs.mustache', 'utf8'),
    { dayNumber: dayNum }
));
