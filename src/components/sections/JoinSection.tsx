"use client";

import { useState } from "react";
import { useMessages } from "next-intl";
import type { SiteContent } from "@/lib/content";

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5FC78C" strokeWidth="2.4">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function JoinSection() {
  const content = useMessages() as SiteContent;
  const section = content.sections.join;
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [form, setForm] = useState({
    name: "",
    village: "",
    phone: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setName(form.name.trim() || "...");
    setJoined(true);
  }

  return (
    <section
      id="join"
      className="bg-section-green"
    >
      <div className="site-wrap">
        <div className="r-stack grid grid-cols-1 overflow-hidden rounded-[20px] border border-[#e5ece2] shadow-[0_1px_3px_rgba(20,36,28,0.05),0_30px_64px_rgba(20,36,28,0.10)] lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-dark px-[50px] py-14 text-white">
            <span className="font-display text-xs font-medium uppercase tracking-[0.25em] text-brand-light">
              {section.eyebrow}
            </span>
            <h2 className="type-h2 mt-4 leading-[1.16]">{section.title}</h2>
            <p className="mt-5 text-[15.5px] leading-[1.8] text-[#a9c5b6]">
              {section.body}
            </p>
            <div className="mt-[26px] flex items-center gap-2.5 text-sm text-[#a9c5b6]">
              <CheckIcon />
              {section.freeNote}
            </div>
          </div>

          <div className="bg-white px-[50px] py-14">
            {joined ? (
              <div className="px-2.5 py-[34px] text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-soft">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#178A4E" strokeWidth="2.4">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="mt-[22px] text-[23px] font-semibold tracking-[-0.015em] text-text">
                  {section.successTitle.replace("{name}", name)}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-text-muted">
                  {section.successBody}
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
                <label className="field-label">
                  {section.form.name}
                  <input
                    required
                    value={form.name}
                    placeholder={section.form.namePlaceholder}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    className="field-input"
                  />
                </label>
                <label className="field-label">
                  {section.form.village}
                  <input
                    value={form.village}
                    placeholder={section.form.villagePlaceholder}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        village: event.target.value,
                      }))
                    }
                    className="field-input"
                  />
                </label>
                <label className="field-label">
                  {section.form.phone}
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    placeholder={section.form.phonePlaceholder}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    className="field-input"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1.5 rounded-[10px] bg-brand px-4 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  {content.common.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
