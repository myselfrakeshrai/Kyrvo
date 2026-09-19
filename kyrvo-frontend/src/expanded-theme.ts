import '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary?: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}
