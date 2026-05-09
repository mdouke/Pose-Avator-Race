# Pose Avatar Race

Pose Avatar Race is a browser-based 3D racing game controlled by body movement.

Pose Avatar Race は、Webカメラによる身体動作認識を用いて、three.js上の3Dアバターを操作するブラウザベースのレースゲームです。

MediaPipe Pose Landmarkerで取得した身体ランドマークを、体の傾き・屈み・腕振りなどのゲーム入力に変換し、プレイヤーは身体を使ってアバターを操作しながらゴールを目指します。

本作品は、大学授業で制作した **Cube Race** を発展させたものです。  
Cube Raceではプレイヤーを立方体として表示していましたが、本作品ではBlenderで作成・リギングした人型モデルをGLB形式で読み込み、身体動作とアバター表現を結びつけた、より身体性のあるレース体験を目指します。

---

## Demo

現在制作中です。

- Demo Video: Coming soon
- Live Demo: Coming soon
- Screenshots: Coming soon

---

## Concept

本作品のコンセプトは、**身体を使って操作する3Dアバターレース** です。

一般的なキーボードやゲームパッドによる操作ではなく、Webカメラで読み取った身体の動きをゲーム入力として利用します。

プレイヤーは、体を傾けたり、屈んだり、腕を振ったりすることで、three.js上のアバターを操作します。

最初は1人で遊べるタイムアタックモードを実装し、その後、Socket.IOを用いたオンライン対戦モードへ発展させる予定です。

---

## Background

前身となる **Cube Race** は、Webカメラの姿勢認識を使って2人で競争する、ブラウザベースの3Dレースゲームです。

Cube Raceでは、プレイヤーを立方体として表示し、MediaPipeで取得した手や身体の位置をもとに移動・スケール変化を行っていました。また、Node.js / Express / Socket.IO によって2人の接続管理と位置同期を行い対戦モードのみ実装していました。

本作品では、その仕組みを引き継ぎつつ、以下の点を発展させます。

- 立方体プレイヤーを人型アバターに置き換える
- Blenderで作成・リギングした3Dモデルを利用する
- 身体動作をより自然なゲーム入力に変換する
- 体の傾き、屈み、腕振りなどを操作に利用する
- 1人プレイ用のタイムアタックモードを追加する
- 将来的にオンライン対戦モードを充実させる

---

## Features

### Current / Base Features

- Webカメラによる身体動作認識
- MediaPipe Pose Landmarkerによる姿勢ランドマーク取得
- three.jsによる3D空間描画
- Node.js / Express によるローカルサーバー
- Socket.IOによるリアルタイム通信
- 障害物・壁・ゴール判定
- 効果音再生

### Planned Features

- Blenderで作成・リギングした人型GLBモデルの読み込み
- Cubeプレイヤーから人型アバターへの置き換え
- 身体の傾きによる左右移動
- 屈み動作による障害物回避
- 両手上げによるready判定
- 腕振りによる加速入力
- 1人プレイのタイムアタックモード
- ベストタイムの保存
- 2人以上のオンライン対戦モードの再実装
- アバターの姿勢・スケール・移動状態の同期

---

## Game Modes

### Single Player Mode

1人でプレイし、ゴールまでのタイムを記録するモードです。

身体動作による操作の練習や、自己ベスト更新を目的とします。  
最初の実装では、ブラウザの `localStorage` を使ってベストタイムを保存します。

### Multiplayer Mode

2人以上のプレイヤーがそれぞれのブラウザから接続し、Socket.IOによって位置や状態を同期しながらゴールを目指す対戦モードです。

Cube Raceではこのモードをメインとしていましたが、Single Player Modeの実装後に再実装します。

---

## Gameplay

### 1. Camera Setup

プレイヤーはブラウザ上でWebカメラを有効にします。

MediaPipe Pose Landmarkerによって身体ランドマークを取得し、ゲーム入力へ変換します。

### 2. Ready

両手を上げるなどのreadyポーズを取ることで、ゲーム開始準備を行います。

### 3. Control

プレイヤーは身体動作によってアバターを操作します。

| 身体動作 | ゲーム入力 |
|---|---|
| 体を左に傾ける | 左移動 |
| 体を右に傾ける | 右移動 |
| 屈む | 高さを下げる / 障害物回避 |
| 腕を振る | 加速 |
| 両手を上げる | ready |

### 4. Goal

プレイヤーは障害物や壁を避けながらゴールを目指します。

シングルプレイでは、ゴールまでのタイムを記録します。  
マルチプレイでは、先にゴールしたプレイヤーが勝利します。

---

## System Overview

```txt
Web Camera
    ↓
MediaPipe Pose Landmarker
    ↓
Pose Feature Extraction
    ↓
Pose Input
    ↓
Game Control
    ↓
Three.js Avatar
    ↓
Single Player Timer / Socket.IO Sync
```

---

## Pose Input Design

実装後に追記予定です。

## Motion Detection

実装後に追記予定です。

---

## 3D Avatar

本作品では、Blenderで作成・リギングした人型モデルを使用します。

モデル制作・リギングの参考資料として、以下のチュートリアルを参考にしています。

- Blender Character Modeling / Rigging Tutorial  
  https://www.youtube.com/watch?v=aMRRNC1J6tU&list=PLlAL3NKFYT5sRIN8SzGMzPtEICJQB-zTz&index=2

- Blender Character Rigging Tutorial  
  https://www.youtube.com/watch?v=5-qVNEKEDJs&list=PLlAL3NKFYT5sRIN8SzGMzPtEICJQB-zTz&index=3

Blenderで作成したモデルはGLB形式で書き出し、three.jsのGLTFLoaderで読み込みます。

---

## MediaPipe Integration

MediaPipe連携には、Tetsuaki Baba氏による **p5MediaPipe** を参考・利用しています。

p5MediaPipeは、p5.jsとMediaPipeを組み合わせたサンプル集であり、Pose Landmarkerを含む複数のMediaPipeタスクを扱うための実装例が含まれています。

- p5MediaPipe  
  https://github.com/TetsuakiBaba/p5MediaPipe

本作品では、前作Cube Raceでも利用したMediaPipe連携の仕組みをもとに、Pose Landmarkerの出力をゲーム入力へ変換します。

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- three.js
- p5.js
- MediaPipe Pose Landmarker

### Backend

- Node.js
- Express
- Socket.IO

### 3D Model

- Blender
- glTF / GLB
- Rigged humanoid model

### Future Extension

- Python
- scikit-learn
- TensorFlow.js

---

## Project Structure

現在のCube Raceの構成をもとに、段階的に整理していきます。

```txt
IntFinal_CubeRace/
├── main.js
├── package.json
├── package-lock.json
├── README.md
├── public/
│   ├── index.html
│   ├── js/
│   ├── models/
│   ├── sounds/
│   └── wasm/
└── .gitignore
```

今後、必要に応じて以下のように整理する予定です。

```txt
public/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── three-game.js
│   ├── pose-input.js
│   ├── pose-detector.js
│   ├── socket-client.js
│   ├── timer.js
│   └── sketch.js
├── models/
│   ├── avatar.glb
│   └── pose_landmarker_lite.task
├── sounds/
└── wasm/
```

---

## Setup

```bash
npm install
```

---

## Run

```bash
node main.js
```

Then open:

```txt
http://localhost:3000
```

---

## Development Process

本作品は、VSCodeとCodexを用いたAI支援開発によって制作します。

開発では、GitHub Issueに整理したタスクをもとに、Codexを活用してコードの追加・修正・リファクタリングを行います。実装内容はローカル環境で逐次確認し、エラーや挙動を検証しながら、既存のCube Raceを段階的に拡張していきます。

開発者は、作品コンセプトの設計、要件定義、タスク分解、実装方針の判断、動作確認、デバッグ方針の決定を担当します。

---

## Development Roadmap

### Milestone 1: Repository Refactor

- [x] READMEを書き直す
- [ ] 既存Cube Raceのファイル構成を確認する
- [ ] 既存機能を壊さずに起動確認する
- [ ] JavaScriptファイルの役割を整理する
- [ ] 今後の機能追加に向けてモジュール分割する

### Milestone 2: Single Player Mode

- [ ] 1人プレイモードを追加する
- [ ] スタート・ゴール・リトライの流れを作る
- [ ] タイマーを実装する
- [ ] ベストタイムを `localStorage` に保存する
- [ ] ベストタイムを画面に表示する

### Milestone 3: Humanoid Avatar

- [ ] Blenderからリギング済み人型モデルをGLB形式で書き出す
- [ ] GLTFLoaderでGLBモデルを読み込む
- [ ] Cubeプレイヤーを人型アバターに置き換える
- [ ] アバターのスケール・向き・位置を調整する
- [ ] キーボード操作でアバターを動かせるようにする

### Milestone 4: Pose-Based Controls

- [ ] MediaPipeランドマーク処理を整理する
- [ ] 体の傾き検出を実装する
- [ ] 屈み検出を実装する
- [ ] 両手上げready判定を実装する
- [ ] 腕振り検出を実装する
- [ ] Pose入力値にスムージングを加える

### Milestone 5: Multiplayer Mode

- [ ] Socket.IOでプレイヤー位置を同期する
- [ ] アバターの回転・スケールを同期する
- [ ] ready状態を同期する
- [ ] 2人対戦の開始フローを整理する
- [ ] 勝敗判定を同期する

### Milestone 6: Portfolio Polish

- [ ] UIを整理する
- [ ] スクリーンショットを追加する
- [ ] デモ動画を撮影する
- [ ] READMEにデモ動画を掲載する
- [ ] 作品説明をポートフォリオ用に整理する

---

## Future Work

### Machine Learning-Based Pose Classification

現在は、身体ランドマークの位置関係や時間変化を用いたルールベースのポーズ検出を想定しています。

今後の発展として、MediaPipe Pose Landmarkerから得られるランドマーク値を記録し、機械学習によってポーズや動作を分類することを検討しています。

想定している分類対象は以下です。

- standing
- leanLeft
- leanRight
- crouch
- handsUp
- armSwing
- armsOpen

静止ポーズについては、1フレーム分のランドマークから分類します。  
腕振りなどの動作については、一定時間分のランドマーク履歴を用いて分類します。

---

## Notes

This project is currently under development.

The initial goal is to complete a playable browser-based prototype with:

- Single player time attack mode
- Humanoid avatar rendering
- Pose-based movement
- Best time saving
- Basic race gameplay
- Demo video and documentation

After that, the project will be extended to support multiplayer racing.

---

## Credits / References

### MediaPipe / p5.js

- Tetsuaki Baba, p5MediaPipe  
  https://github.com/TetsuakiBaba/p5MediaPipe

### 3D Modeling / Rigging References

- Blender Character Modeling / Rigging Tutorial  
  https://www.youtube.com/watch?v=aMRRNC1J6tU&list=PLlAL3NKFYT5sRIN8SzGMzPtEICJQB-zTz&index=2

- Blender Character Rigging Tutorial  
  https://www.youtube.com/watch?v=5-qVNEKEDJs&list=PLlAL3NKFYT5sRIN8SzGMzPtEICJQB-zTz&index=3

---

## License

This project is currently not licensed for reuse.  
ライセンスは現在未定です。
