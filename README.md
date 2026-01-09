# CareNA

> **복잡한 건강검진 결과를 이해하기 쉽게 해설하고, 개인 상태에 맞춘 건강 관리 방향을 제안하는 헬스케어 서비스**

<br/>

## 팀원

| <img src="https://github.com/jstar000.png" width="120" /> | <img src="https://github.com/eojindesu.png" width="120" /> | <img src="https://github.com/wonpark1.png" width="120" /> | <img src="https://github.com/mimizae.png" width="120" /> |
| :-------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: | :------------------------------------------------------: |
| [임지성 👑](https://github.com/jstar000)                 | [김어진](https://github.com/eojindesu)                     | [박원](https://github.com/wonpark1)                       | [지민재](https://github.com/mimizae)                     |

<br/>

## 기술 스택

| 역할                 | 종류                                                                                                 | 선정 근거                                                                  |
| :------------------: | :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------- |
| Build Tool           | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)      | ESBuild 기반의 빠른 번들링과 HMR로 개발 생산성 향상                        |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)   | 컴포넌트 기반 아키텍처로 UI 구축을 간소화하고 효율적인 상태 관리           |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | 정적 타입 검사로 런타임 오류를 사전에 방지하고 코드 안정성 확보            |
| Styling              | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | 제로 런타임 유틸리티 기반 스타일링으로 빠르고 일관된 UI 구현               |
| Data Fetching        | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | 서버 상태와 캐싱을 선언적으로 관리                                         |
| Development Tools    | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) | 독립 환경에서 UI 컴포넌트를 개발·테스트하고 디자이너와 협업 강화           |
|                      | ![Swagger](https://img.shields.io/badge/Swagger_TS_API-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) | OpenAPI 기반 API 함수와 타입 자동 생성으로 개발 생산성 및 타입 안정성 확보 |
| Code Quality         | ![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white)   | Linting과 Formatting을 단일 도구로 통합하여 빠른 속도와 간편한 설정        |
|                      | ![Lefthook](https://img.shields.io/badge/Lefthook-FF1E1E?style=for-the-badge&logoColor=white)        | Git hooks를 통한 커밋 전 코드 품질 자동 검사                               |
| Package Manager      | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)      | 심볼릭 링크 기반 글로벌 저장소로 디스크 절약 및 빠른 설치 속도             |
| Deployment           | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | Git 연동을 통한 자동 배포와 간편한 CI/CD 설정                              |
| Version Control      | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) | 분산 버전 관리와 PR 기반 협업으로 코드 품질 및 팀 생산성 향상              |

<br/>

## 폴더 구조

[FSD(Feature-Sliced Design)](https://feature-sliced.github.io/docs) 아키텍처를 기반으로 구성

```
src/
├── app/                     # 앱 초기화, 전역 설정
│   ├── providers/           # Context Providers
│   ├── routes/              # 라우팅 설정
│   └── styles/              # 전역 스타일
├── pages/                   # 페이지 컴포넌트
│   └── [page-name]/
│       ├── ui/              # 페이지 UI
│       ├── api/             # 페이지 전용 API (queries, mutations)
│       ├── model/           # 상태 관리, 비즈니스 로직
│       └── lib/             # 페이지 전용 유틸
├── widgets/                 # 독립적인 UI 블록
│   └── [widget-name]/
│       └── ui/
└── shared/                  # 공통 모듈
    ├── ui/                  # 공통 UI 컴포넌트
    ├── apis/                # API 클라이언트, 자동 생성 코드
    ├── libs/                # 공통 유틸리티
    ├── styles/              # 공통 스타일, 디자인 토큰
    ├── configs/             # 설정 파일
    └── assets/              # 정적 리소스 (svg, img)
```

<br/>

## 컨벤션

<details>
<summary><strong>브랜치 전략</strong></summary>
<br/>

### 3 브랜치 전략 (`main`, `develop`, `feat`)

- **`main`** : 오직 배포를 위한 브랜치
- **`develop`** : 팀원끼리 작업한 내용(feature)을 합치는 곳
- **`feat`** : 각 작업에 따라 새로 파고 사용할 브랜치 (하나의 feat 브랜치는 하나의 Issue와 연결)

### Prefix

| 머릿말     | 설명                                                            |
| ---------- | --------------------------------------------------------------- |
| `init`     | 패키지 설치, 개발 설정                                          |
| `feat`     | 새로운 기능 추가 / 퍼블리싱                                     |
| `fix`      | 버그 수정                                                       |
| `style`    | CSS 등 사용자 UI 디자인 변경                                    |
| `api`      | api 연결 로직 작성                                              |
| `refactor` | 프로덕션 코드 리팩토링, QA 반영                                 |
| `chore`    | 빌드 테스트 업데이트, 패키지 매니저 설정 (프로덕션 코드 변경 X) |
| `deploy`   | 배포 작업                                                       |
| `test`     | 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)             |
| `rename`   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우              |
| `remove`   | 파일을 삭제하는 작업만 수행한 경우                              |
| `docs`     | 문서 수정                                                       |

### 브랜치 네이밍

```
prefix/#이슈번호/설명
```

- 여러 단어는 `-`으로 연결
- 예시: `setting/#1/router-setting`, `feat/#5/login`, `fix/#6/register-form-bug-fix`

### 커밋 컨벤션

```
prefix: 커밋 메시지
```

- 예시: `feat: login form 구현`, `refactor: image upload 로직 커스텀훅으로 분리`

### 브랜치 병합 규칙

1. 메인 브랜치(main, develop)에서 직접적인 커밋은 하지 않는다.
2. 작업 브랜치(feat)에서만 커밋하고, 병합은 PR(Pull Request)을 통해서만 진행한다.
3. 작업 전에는 항상 `git pull origin develop`으로 feature 브랜치를 최신화한다.
4. 팀원들의 리뷰 후 2명 이상의 approve를 받아야 merge할 수 있다.

</details>

<details>
<summary><strong>코딩 컨벤션</strong></summary>
<br/>

### 1. 네이밍

| 대상                 | 규칙                  | 예시                          |
| -------------------- | --------------------- | ----------------------------- |
| 컴포넌트 / class     | `PascalCase`          | `UserProfile`, `HealthReport` |
| 폴더명, 파일명       | `kebab-case` (복수형) | `apis/`, `components/`        |
| 변수, 함수, 파라미터 | `camelCase`           | `userName`, `getUserData`     |
| 상수                 | `UPPER_SNAKE_CASE`    | `API_BASE_URL`                |

### 2. 변수

- `var` 사용 금지. `const` 기본, 필요시 `let` 사용
- 전역 변수 최대한 지양
- 구조 분해 할당 적극 활용: `const { name, age } = user;`
- 문자열 조합 시 템플릿 리터럴 사용: `` `Hello, ${name}` ``

### 3. 함수

- 화살표 함수 기본 사용
- 이벤트 핸들러: `handle + 이벤트` (예: `handleBtnClick`)
- props 전달 시: `on + 이벤트` (예: `onClick={handleBtnClick}`)
- boolean 변수: `is/can/should/has + 상태` (예: `isLogined`, `canSubmit`)
- API 함수: `HTTP 메서드 + 명사` (예: `getUserList`, `postUserLike`)
- 배열 처리: 스프레드 연산자, 함수형 메서드(`map`, `filter` 등) 사용

### 4. TypeScript

- object: `interface`, 단일 변수: `type`
- 컴포넌트 props 타입: `역할 + Props` (예: `HeaderProps`)
- API response/request 타입: `OOOResponse`, `OOORequest`

```tsx
interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  // ...
}
```

### 5. 기타

- 변수/함수명 20자 미만, 필요시 주석 추가
- 의미없는 `<div>` 지양, 최상단은 fragment(`<>`) 사용
- children 불필요 시 self-closing: `<Component />`
- named export 기본 사용

</details>
