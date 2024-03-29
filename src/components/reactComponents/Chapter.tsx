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
    <div className="Chapter" id={title.toLowerCase()}>
      <h1 className="Chapter-header" onClick={handleClick}>
        {title}
      </h1>
      <div className="Chapter-content" style={style}>
        {children}
      </div>
    </div>
  );
};

export default Chapter;
