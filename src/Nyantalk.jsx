import React, { useState, useEffect } from 'react';
import nyanCatImg from './assets/hapitan.png'; // ニャンコ画像パスに合わせてね

const messages = [
  "カリカリ残すけどおやつは食う。",
  "タバコ吸ってないようじゃダメか。タバコはね、吸っとかないと。",
  "チュールしか勝たん。",
  "タバコは100利あって1害なし。",
  "タバコは、まだガンには効かないがそのうち効くようになる。",
  "5000兆円欲しい。",
  "チピチピチャパチャパドゥビドゥビダバダバ。",
  "あぁ～！水素の音ォ〜！！",
  "私の敵が全部死ぬまで生きます。"
];

export default function TalkingNyanCat() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={nyanCatImg}
        alt="Nyan Cat"
        style={{ width: 150, height: "auto" }}
      />
      <div
        style={{
            position: "absolute",
            top: 0,
            left: "110%",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            maxWidth: 220, // ← ここ重要！小さすぎると縦になる
            minWidth: 120, // ← 最低限の幅も設定
            fontWeight: "bold",
            fontSize: 14,
            color: "#333",
            userSelect: "none",
            whiteSpace: "normal", // ← これで自動折り返し
            overflowWrap: "break-word",
            wordBreak: "break-word",
            lineHeight: 1.4,
        }}
      >
        {message}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-10px",
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid white",
            transform: "translateY(-50%)"
          }}
        />
      </div>
    </div>
  );
}
