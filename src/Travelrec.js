import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import "./App.css";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = {
    opacity: open ? 2.2 : 0,
    borderRadius: "10px",
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  };

  return (
    <div ref={ref} style={style} {...other}>
      {children}
    </div>
  );
});

const Travelrec = ({ travelData, closeRecs }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeRecs();
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose} BackdropComponent={Backdrop}>
        <Fade in={open}>
          <div id="travelinfo_card">
            <p>{travelData}</p>
            <p>
              Data retrieved from{" "}
              <a href="https://www.trackcorona.live">www.trackcorona.live</a>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Travelrec;
