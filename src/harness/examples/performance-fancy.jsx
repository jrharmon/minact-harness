//react render performance - many
const contacts = [];
for (let i = 0; i < 1000; i++) {
    contacts.push(i.toString());
}

function ContactCard(props) {
    const name = props.contactId % 2 === 0 ? "Jim Smith" : "Jane Smith";
    const src = props.contactId % 2 === 0 ? "img/avatar1.png" : "img/avatar2.png";

    return (
        <div className="chip">
            <img src={src} alt="Person" width="96" height="96" />
            {name}
        </div>
    );
}

let element = (
    <div>
        {contacts.map(c => <ContactCard contactId={c} />)}
    </div>
);

module.exports = element;