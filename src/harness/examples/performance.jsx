//react render performance - many
const contactIds = [];
for (let i = 0; i < 1000; i++) {
    contactIds.push(i);
}

let element = (
    <ul>
        {contactIds.map(item => <li key={item}>{item}</li>)}
    </ul>
);

module.exports = element;