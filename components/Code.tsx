"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { themes, Highlight } from "prism-react-renderer";
import { useEffect, useState } from "react";

////

interface CodeProps {
  code: string;
  show: boolean;
  language: "jsx" | "tsx" | "cpp";
  animationDelay?: number;
  animated?: boolean;
}

const Code: React.FC<CodeProps> = ({
  code,
  show,
  animated,
  animationDelay,
  language,
}) => {
  //hooks
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;

      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  ////

  //methods

  const lines = text.split(/\r\n|\r|\n/).length;

  const theme =
    applicationTheme === "light" ? themes.nightOwlLight : themes.nightOwl;

  ////

  return (
    <Highlight code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar",
            className,
          )}
          style={{
            maxHeight: show ? lines * 24 + 100 : 0,
            opacity: show ? 1 : 0,
          }}>
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, i });

                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
