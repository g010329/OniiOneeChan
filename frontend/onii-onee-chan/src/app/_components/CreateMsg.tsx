"use client";

import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useChainId } from "wagmi";
import Danmaku from "rc-danmaku";
import styled from "styled-components";

const sampleTextArr = [
  "  Hello(kelly.gawrgura.eth)",
  "       GM(xyz.gawrgura.eth)",
  "Good Morning(tim.gawrgura.eth)",
  "             Hi(cat.gawrgura.eth)",
];

const SCROLL_DEVNET_CHAIN_ID = 2227728;

function CreateMsg({ ensName }: { ensName: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const chainId = useChainId();
  const expandAnimation = {
    width: isFocused ? ["480px", "680px", "660px"] : "680px",
  };

  const danmakuInsRef = useRef<Danmaku | null>(null);
  const [showColor, setShowColor] = useState(false);
  const colorRef = useRef("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const danmakuIns = new Danmaku(".danmaku-wrapper", {
      rowHeight: 80,
      speed: 120,
      opacity: 1,
      maxRow: 6,
      // onBulletIn() {
      //   console.log("====bullet in====", danmakuIns.getRestAmount());
      // },
      // onBulletOut() {
      //   console.log("====bullet out====", danmakuIns.getRestAmount());
      // },
      // onQueueRunOut() {
      //   console.log("====queue run out====");
      // },
    });

    danmakuInsRef.current = danmakuIns;
  }, []);

  useEffect(() => {
    if (showColor) {
      colorRef.current = (
        document.querySelector(".color-piker") as HTMLInputElement
      ).value;
    }
  }, [showColor]);

  useEffect(() => {
    if (danmakuInsRef.current) {
      if (isPaused) {
        danmakuInsRef.current.pause();
      } else {
        danmakuInsRef.current.resume();
      }
    }
  }, [isPaused]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      if (danmakuInsRef.current) {
        danmakuInsRef.current.pushAll(sampleTextArr, {
          color: showColor ? colorRef.current : undefined,
        });
      }
    }, 10000);
    const clearTimeoutId = setInterval(() => {
      if (danmakuInsRef.current) {
        danmakuInsRef.current.clearQueue();
      }
    }, 12000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(clearTimeoutId);
    };
  }, []);

  return (
    <div>
      <Wrapper className="test-danmaku">
        <div className="danmaku-wrapper" />
        {/* <motion.div
          animate={expandAnimation}
          transition={{ duration: 0.2, times: [0, 0.7, 1] }}
          className="space-y-6"
        > */}
        <Input
          className="danmaku-text-input focus:border-none focus-visible:ring-[#5A55EB] h-[80px] rounded-2xl text-xl placeholder:text-slate-400 min-w-[400px]"
          placeholder="hello"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* </motion.div> */}
        <button
          className="mt-10 rounded-full bg-purple-400 py-4 px-6 text-white"
          type="button"
          onClick={(): void => {
            if (danmakuInsRef.current) {
              const $input = document.querySelector(
                ".danmaku-text-input"
              ) as HTMLInputElement;
              if ($input.value && $input.value.trim()) {
                danmakuInsRef.current.emit(
                  `${$input.value} (${ensName}.gawrgura.eth)`,
                  {
                    color: showColor ? colorRef.current : undefined,
                  }
                );
              }

              $input.value = "";
              $input.focus();
            }
          }}
        >
          Send Message{" "}
          {chainId === SCROLL_DEVNET_CHAIN_ID &&
            !!ensName &&
            `(${ensName}.gawrgura.eth)`}
        </button>
      </Wrapper>
    </div>
  );
}

export { CreateMsg };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  input[type="text"] {
    padding: 0.2em;
    width: 150px;
    max-width: 150px;
  }

  .danmaku-wrapper {
    width: 100%;
    height: 60vw;
  }
`;
