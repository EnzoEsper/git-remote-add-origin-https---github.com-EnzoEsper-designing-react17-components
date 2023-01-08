import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ startingTheme, children }) => {
  const [theme, setTheme] = useState(startingTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider };