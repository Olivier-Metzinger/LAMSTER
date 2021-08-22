import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function SnackbarComponent() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert open={true} onClose={handleClose} severity="success">
                    Compte crée avec succès!
                </Alert>
            </Snackbar>
        </div>
    );
}
