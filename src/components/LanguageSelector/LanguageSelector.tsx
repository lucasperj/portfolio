import { useContext } from 'react';
import { LanguageContext } from '../../i18n/LanguageContext';
import { Select, MenuItem } from '@mui/material';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Select
      value={language}
      onChange={e => setLanguage(e.target.value)}
      size="small"
      sx={{ ml: 2, color: 'white', borderColor: 'white', minWidth: 100 }}
      variant="outlined"
    >
      <MenuItem value="pt">Português</MenuItem>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
    </Select>
  );
};

export default LanguageSelector; 