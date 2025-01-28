export default function getOdds (event) {
  console.log(event)
    let period = event.periods["1"]; // Default to period "1" (Full Time)
    if (!period || !period["FT"]) {
      period = event.periods["0"]; // Fallback to period "0" (Money Line)
    }
    if (period && period["FT"]) {
      const { home, draw, away } = period["FT"];
      return {
        home: home.side0.length > 0 ? home.side0[0].toFixed(2) : '-',
        draw: draw.side0.length > 0 ? draw.side0[0].toFixed(2) : '-',
        away: away.side0.length > 0 ? away.side0[0].toFixed(2) : '-',
      };
    } else if (period && period["ML"]) {
      const { side0, side1 } = period["ML"];
      return {
        home: side0.length > 0 ? side0[0].toFixed(2) : '-',
        draw: '-',
        away: side1.length > 0 ? side1[0].toFixed(2) : '-',
      };
    }
    return { home: '-', draw: '-', away: '-' };
  };