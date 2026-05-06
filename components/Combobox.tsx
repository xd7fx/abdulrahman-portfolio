"use client";

import { Check, ChevronDown, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export interface ComboboxOption {
  /** Internal unique value. */
  value: string;
  /** Display label. */
  label: string;
  /** Optional secondary line (e.g. sector for a university). */
  hint?: string;
}

interface ComboboxProps {
  /** Full option list. The component does its own filtering. */
  options: ComboboxOption[];
  /** Selected value, or "" for none. The literal `OTHER_VALUE` represents "Other". */
  value: string;
  /** Called with the new value when the user picks an option. */
  onChange: (value: string) => void;
  /** Placeholder text shown when no value is selected. */
  placeholder: string;
  /** Search-input placeholder shown inside the dropdown. */
  searchPlaceholder: string;
  /** Label for the "Other" sentinel option. */
  otherLabel: string;
  /** Maximum filtered results to show at once. */
  maxResults?: number;
  /** ARIA label for the trigger button. */
  ariaLabel: string;
  /** Optional id for the input (handy for label association). */
  id?: string;
  /** Whether to mark the field as required (still always required by parent form for validation). */
  required?: boolean;
}

export const OTHER_VALUE = "__OTHER__";

export default function Combobox({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  otherLabel,
  maxResults = 25,
  ariaLabel,
  id,
  required,
}: ComboboxProps) {
  const reactId = useId();
  const buttonId = id ?? `combobox-${reactId}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Focus the search input when opening.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
    setQuery("");
  }, [open]);

  const selectedLabel = useMemo(() => {
    if (value === OTHER_VALUE) return otherLabel;
    if (!value) return "";
    const found = options.find((o) => o.value === value);
    return found?.label ?? value;
  }, [options, value, otherLabel]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options.slice(0, maxResults);
    const matches: ComboboxOption[] = [];
    for (const opt of options) {
      if (opt.label.toLowerCase().includes(q) || (opt.hint?.toLowerCase().includes(q) ?? false)) {
        matches.push(opt);
        if (matches.length >= maxResults) break;
      }
    }
    return matches;
  }, [options, query, maxResults]);

  const handlePick = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        id={buttonId}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg bg-space-navy/40 border border-space-cyan/30 hover:border-space-cyan/60 focus:border-space-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-space-cyan text-white text-start"
      >
        <span className={`flex-1 min-w-0 truncate ${selectedLabel ? "text-white" : "text-space-ice/40"}`}>
          {selectedLabel || placeholder}
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {selectedLabel && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear"
              onClick={handleClear}
              className="text-space-ice/50 hover:text-space-cyan p-0.5"
            >
              <X size={14} />
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-space-cyan transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Hidden input so native form validation catches missing required value. */}
      {required && (
        <input
          tabIndex={-1}
          aria-hidden
          required
          value={value}
          onChange={() => {
            /* parent owns state */
          }}
          className="absolute opacity-0 pointer-events-none w-px h-px"
        />
      )}

      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-space-cyan/30 bg-space-dark/95 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-space-cyan/20">
            <Search size={14} className="text-space-cyan/70 shrink-0" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-space-ice/40 focus:outline-none"
            />
          </div>

          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-xs text-space-ice/50 italic">
                — no matches —
              </li>
            ) : (
              filtered.map((opt) => {
                const selected = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => handlePick(opt.value)}
                      className={`w-full flex items-start justify-between gap-2 px-3 py-2 text-sm text-start transition-colors ${
                        selected
                          ? "bg-space-cyan/15 text-space-cyan"
                          : "text-space-ice hover:bg-space-cyan/10"
                      }`}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block truncate">{opt.label}</span>
                        {opt.hint && (
                          <span className="block text-xs text-space-ice/50 truncate">
                            {opt.hint}
                          </span>
                        )}
                      </span>
                      {selected && (
                        <Check size={14} className="text-space-cyan shrink-0 mt-0.5" />
                      )}
                    </button>
                  </li>
                );
              })
            )}

            {/* Other sentinel — always at the bottom */}
            <li role="option" aria-selected={value === OTHER_VALUE}>
              <button
                type="button"
                onClick={() => handlePick(OTHER_VALUE)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm border-t border-space-cyan/20 ${
                  value === OTHER_VALUE
                    ? "bg-space-cyan/15 text-space-cyan"
                    : "text-space-ice/80 hover:bg-space-cyan/10"
                }`}
              >
                <span className="flex-1 text-start">{otherLabel}</span>
                {value === OTHER_VALUE && <Check size={14} className="text-space-cyan" />}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
