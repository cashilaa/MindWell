import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { motion } from 'framer-motion';

export function WelcomeModal({ open, handleOpen }) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="max-w-[360px]"
    >
      <DialogHeader className="text-center justify-center">
        <Typography variant="h4" color="blue">
          Welcome to MindWell
        </Typography>
      </DialogHeader>
      <DialogBody className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography variant="paragraph" color="gray" className="mb-4">
            Your trusted companion for mental wellness. We're here to support your journey to better mental health.
          </Typography>
        </motion.div>
      </DialogBody>
      <DialogFooter className="justify-center">
        <Button 
          variant="gradient" 
          color="blue" 
          onClick={handleOpen}
          className="normal-case"
        >
          Get Started
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
