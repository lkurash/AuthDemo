export default function Contacts() {
  return (
    <div className="contacts-fixed" aria-label="Contacts">
      <article className="tile contacts-tile">
        <h3>My contacts</h3>
        <div className="list contacts-list">
          <div>
            <a href="mailto:kurash.lizaveta@gmail.com">
              kurash.lizaveta@gmail.com
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/lizaveta-kurash"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/lizaveta-kurash
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
