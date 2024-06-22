interface IChapter {
  title: string;
  boarder?: boolean;
}

const Chapter: React.FC<IChapter> = ({ title, boarder, children }) => {
  function handleClick() {
    document.location.href = "#" + title.toLowerCase().replaceAll(" ", "-");
  }

  const style = boarder ?? true ? {} : { borderTop: "none" };

  return (
    <div className="Chapter">
      <h1 className="Chapter-header">
        <span className="Chapter-header-text" onClick={handleClick}>
          {title}
        </span>
      </h1>
      <div className="Chapter-content" id={title.toLowerCase()} style={style}>
        {children}
      </div>
    </div>
  );
};

export default Chapter;
