import { useEffect, useRef, useState } from "react";
import { Ideas } from "./Idea.js";

export default function IdeaGenerator() {
  const dataKey = "snippets";
  /**
   * @property {React.LegacyRef<HTMLIFrameElement>} iframeRef
   */
  const iframeRef = useRef(null);
  const [snippetData, setSnippetData] = useState(GetData());
  Snippet.snippets = snippetData;
  const [suggestion, setSuggestion] = useState(Generate(snippetData));

  const blocks = null;

  useEffect(() => {
    window.addEventListener("message", (e) => {
      alert(e);
      console.log(e);
    });
    // iframeRef.current.contentWindow.postMessage(blocks, "*");
    return () => {
      //cleanup
    };
  }, [iframeRef.current]);

  function GetData() {
    let data = localStorage.getItem(dataKey);
    if (data == null) data = Ideas;
    return JSON.parse(data);
  }

  function GenerateSnippetSections(snippets) {
    let str = [];
    for (const property in snippets) {
      str.push(
        <div>
          <p>{property}</p>
          <p
            contentEditable={true}
            onBlur={(e) => {
              snippets[property] = e.target.textContent
                .split(",")
                .map((item) => item.trim());
              return setSnippetData(snippets);
            }}
            spellCheck="false"
            style={{ fontSize: ".8em", whiteSpace: "pre" }}
          >
            {snippets[property].join(", \n")}
          </p>
        </div>
      );
    }
    return str;
  }

  return (
    <>
      <div
        style={{
          margin: "8em 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "1.4em",
        }}
      >
        <p style={{ color: "white", marginBottom: "4em" }}>{suggestion}</p>
        <button
          onClick={() => setSuggestion(Generate(snippetData))}
          style={{ fontSize: "1.5em" }}
        >
          Generate
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          ref={iframeRef}
          height="300px"
          width="1000px"
          src={"http://localhost:3001/block1//"}
        ></iframe>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "300px 0px",
          color: "white",
        }}
      >
        {GenerateSnippetSections(snippetData)}
      </div>
    </>
  );
}

class Snippet {
  array;
  static snippets;

  toString(plural = false) {
    return this.Plural(this.Process(Random(this.array)), plural);
  }

  /**
   * @param {string} str
   * @param {boolean} plural
   */
  Plural(str, plural) {
    const regex = /\((\w*)\)/gi;

    return plural
      ? str.replaceAll(regex, (whole, group) => group)
      : str.replaceAll(regex, "");
  }

  /**
   * @param {string[]} array
   */
  constructor(array) {
    this.array = array;
  }

  /**
   * @param {string} str
   */
  Process(str) {
    const regex = /\{(\w*)\}/gi;

    if (str.includes("{"))
      return str.replaceAll(regex, (whole, group) => {
        let plural = false;
        if (group.slice(-1) == "S") {
          group = group.substr(0, group.length - 1);
          plural = true;
        }

        return Snippet.snippets[group] != null
          ? new Snippet(Snippet.snippets[group]).toString(plural)
          : whole;
      });
    else return str;
  }

  /**
   * @param {string[]} array
   */
  Random(array) {
    return array[getRandomInt(0, array.length - 1)];
  }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string[]} array
 */
function Random(array) {
  return array[getRandomInt(0, array.length - 1)];
}

/**
 * @param {string} str
 */
function Correct(str) {
  const regex = / *a [a|o|u|i|e]/gi;
  return str.replaceAll(regex, (select) => Insert(select, 1, "n"));
}

/**
 * @param {string} str
 * @param {number} i
 * @param {string} insert
 */
function Insert(str, i, insert) {
  return [str.slice(0, i), insert, str.slice(i)].join("");
}

function Generate(snippets) {
  return Correct(new Snippet(snippets.template).toString());
}
