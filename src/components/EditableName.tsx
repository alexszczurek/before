"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditableNameProps {
  value: string;
  onChange: (newName: string) => void;
}

export default function EditableName({ value, onChange }: EditableNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== value) {
      onChange(trimmed);
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.input
          key="input"
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setEditValue(value);
              setIsEditing(false);
            }
          }}
          className="text-[24px] font-medium tracking-[-0.16px] text-black bg-transparent border-b border-black outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      ) : (
        <motion.button
          key="display"
          onClick={() => setIsEditing(true)}
          className="text-[24px] font-medium tracking-[-0.16px] text-black text-left cursor-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {value}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
