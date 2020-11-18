# ENTHUS DMX Protocol Adapter TUI
DMX Protocol Adapter 의 설정을 변경하는 어플리케이션입니다.

## 설치
### 실행파일 다운로드
[Release 페이지](https://github.com/enthusapp/dmxProtocolAdapterTUI/releases)에서 가장 마지막 버젼의 Release 를 찾아 `dmxProtocolAdapterTUI.zip` 파일을 다운로드 하고,
압축을 해제합니다.

## 사용방법
### 연결
마이크로 USB 케이블을 PC 와 Protocol-Adapter 사이에 연결합니다.

### 명령어
### 명령어 입력 창 열기
압축을 해제한 폴더를 윈도우즈 파일 브라우저로 열고 경로창에 `cmd .` 을 입력후 엔터를 누르면 명령어 입력 창이 나타납니다.

[윈도우즈 파일 브라우저](img/windowsFileBrowser.jpg)

[cmd 입력](img/cmd.jpg)

[commandLineInput](img/commandLineInput.jpg)

명령어 입력 창에서 이어지는 설명에 따라 통신포트를 설정하고, 원하는 옵션을 입력하여 protocol-adapter 의 동작을 제어할 수 있습니다.

#### 통신포트 설정
PC 장치관리자에서 마이크로 USB 에 할당된 COM Port 를 확인하고 아래와 같이 입력합니다.

```
protocol-adapter.exe -p COM3
```

다른 명령어를 입력할때도 통신포트 설정은 반드시 확인해야 합니다.

#### 제로백 시간 설정
0 % 에서 100 % 까지 걸리는 지연시간을 설정합니다. 0.1 ~ 8 초까지 0.1 초 단위로 설정이 가능합니다.

```
protocol-adapter.exe -p COM3 -z 3.1
```

#### 데이터 반전 설정
DMX512 데이터를 반전 시켜 전달합니다. 0 으로 설정하면 비활성화, 1 로 설정하면 활성화 됩니다.

```
protocol-adapter.exe -p COM3 -i 1
```

#### 샘플링 시작 채널 선택
DMX512 데이터에서 샘플링을 시작할 채널 번호를 선택합니다. 0 ~ 509 까지 선택할수 있습니다.

```
protocol-adapter.exe -p COM3 -s 0
```

#### RGB 채널 순서 선택
DMX512 데이터의 RGB 채널 순서를 변경합니다.

샘플링 시작 채널이 0 이고 RGB 로 채널 순서를 설정하면, 채널 0 이 Red, 채널 1 이 Green, 채널 2 가 Blue 로 설정됩니다.

```
protocol-adapter.exe -p COM3 -c RGB
```

#### 미입력 자동 변환 타이밍 설정
일정시간동안 DMX512 신호 입력이 없으면 자동으로 white 색상을 출력하도록 하는 기능입니다.

0 으로 설정하면 비활성화되고, 양수로 설정하면 해당 시간 이후에 white 로 변경됩니다.

```
protocol-adapter.exe -p COM3 -w 5.1
```

## 개발
### Packaging
`pkg` 명령어로 exe 파일 생성하고 `node_modules` 폴더와 같이 압축하여 

```
pkg . -t win
```
