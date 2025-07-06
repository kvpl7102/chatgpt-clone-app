import { TextField } from '@mui/material'


type Props = {
    name: string;
    label: string;
    type: string;
}


const CustomInput = (props: Props) => {
  return (
    <TextField
      variant='outlined'
      fullWidth
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      
      sx={{
        width: "400px",
        "& label": {
          color: "white",
        },
        "& label.Mui-focused": {
          color: "cyan",
        },
        "& .MuiOutlinedInput-root": {
          color: "white",
          backgroundColor: "#0e1b2e", // base bg color

          // when focused
          "&.Mui-focused": {
            backgroundColor: "#0e1b2e",
          },

          // handle browser autofill causing white bg
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #0e1b2e inset",
            WebkitTextFillColor: "white",
          },

          "& fieldset": {
            borderColor: "gray",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "cyan",
          },
        },
      }}
    />
  );
}

export default CustomInput