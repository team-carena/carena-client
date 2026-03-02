import { LargeBadge } from "@/shared/ui/badges/large-badge"

const INTRO_TEXT = [
  "본 서비스의 검진결과 해석 및 종합판단은 보건복지부가 고시한 국가건강검진 판정 기준을 참고하여 제공됩니다.",
  "단, 병원 및 검사기관에 따라 적용 기준이나 참고 범위가 일부 다를 수 있습니다.",
];

interface CriteriaItem {
  label: string;
  variant?: "normal" | "borderline" | "suspicious";
  descriptions: string[];
}

const CRITERIA_LIST: CriteriaItem[] = [
  {
    label: "정상A",
    descriptions: [
      "건강이 양호",
      "모든 검진 항목이 정상 범위에 해당하는 경우",
    ],
  },
  {
    label: "정상B",
    variant: "borderline",
    descriptions: [
      "건강에 이상 없으나 자기 관리 및 예방조치 필요",
      "하나 이상의 검진 항목이 경계 범위에 해당하는 경우",
    ],
  },
  {
    label: "의심",
    variant: "suspicious",
    descriptions: [
      "질환으로 발전할 가능성이 있어 추적검사나 전문의료기관을 통한 정확한 진단과 치료가 필요",
      "하나 이상의 검진 항목에서 질환이 의심되는 소견이 확인된 경우",
    ],
  },
];

export const HealthAnalysisBase = () => {
  return (
    <div className="flex flex-col mt-[2.4rem] gap-[4rem] px-[2rem] body04-r-14 text-gray-900">
      
      <div className="flex flex-col gap-[2.2rem]">
        {INTRO_TEXT.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>

      <div className="flex flex-col gap-[2rem]">
        <span className="head04-m-16">[구분 기준]</span>

        {CRITERIA_LIST.map((item) => (
          <div key={item.label} className="flex flex-col gap-[0.8rem]">
            <LargeBadge
              variant={item.variant}
              className="w-fit"
            >
              {item.label}
            </LargeBadge>

            <ul className="list-disc pl-[1.6rem] flex flex-col">
              {item.descriptions.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};