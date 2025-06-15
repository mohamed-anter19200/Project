export default function FilePlayer({ file }) {
  return (
    <div className="space-y-4 mt-5">
      <a
        href={file}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Download Files
      </a>
    </div>
  );
}


