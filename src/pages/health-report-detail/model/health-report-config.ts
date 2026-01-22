import type {
	HealthReportConfig,
	HealthReportType,
} from "../config/health-report-types";

/**
 * 검진결과분석 상세페이지 헤더 타이틀 매핑
 * - Layout에서 라우터 params(type) 기반으로 사용
 */
export const HEALTH_REPORT_TITLE_MAP: Record<HealthReportType, string> = {
	basic: "기본 검사",
	"blood-pressure": "혈압 검사",
	diabetes: "당뇨 검사",
	liver: "간장질환 검사",
	kidney: "신장질환 검사",
	anemia: "빈혈 검사",
};

/**
 * 검진결과분석 상세 페이지 설정
 * - 검사 타입별 헤더 타이틀, 섹션 구성 정보를 정의
 * - 페이지별 분기 로직을 컴포넌트가 아닌 config에서 관리
 */
export const HEALTH_REPORT_CONFIG: Record<
	HealthReportType,
	HealthReportConfig
> = {
	/** ================= 기본 검사 ================= */
	basic: {
		sections: [
			{
				key: "height",
				title: "신장",
				description: "정수리부터 발끝까지의 수직 길이를 측정한 값",
			},
			{
				key: "weight",
				title: "체중",
				description: "인체가 중력에 의해 측정되는 몸의 무게",
				showDivider: true,
			},
			{
				key: "waistCircumference",
				title: "허리둘레",
				description: "배꼽 높이에서 수평으로 측정한 복부의 둘레",
				range: {
					type: "sex",
					MALE: {
						normal: "90 미만",
						suspicious: "90 이상",
					},
					FEMALE: {
						normal: "85 미만",
						suspicious: "85 이상",
					},
				},
				increaseText:
					"수치가 클수록 내장지방이 많을 가능성이 높으며 제2형 당뇨병, 고혈압, 이상지질혈증, 관상동맥 질환 등의 발병 위험이 증가합니다",
				decreaseText:
					"허리둘레 감소는 대체로 긍정적인 변화이나, 저체중이 함께 나타날 경우 영양 부족이나 근육 소실을 확인할 필요가 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"규칙적인 식사와 소량 섭취로 과식을 피하세요",
						"걷기 등 일상 속 유산소 활동과 가벼운 근력운동을 병행하세요",
						"7시간 이상의 충분한 수면과 2L 이상의 수분 섭취는 복부 지방 관리에 도움됩니다",
					],
				},
				source: "대한비만학회, Journal of Clinical Medicine",
				showDivider: true,
			},
			{
				key: "bmi",
				title: "BMI 수치",
				description: "신장에 대한 체중의 비율로, 체지방의 정도를 의미",
				range: {
					type: "common",
					value: {
						normal: "18.5~24.9",
						borderline: "18.5 미만 또는 25~29.9",
						suspicious: "30 이상",
					},
				},
				increaseText:
					"BMI 지수가 증가하면 비만으로 인해 고혈압, 당뇨, 심장병 등에 걸릴 위험이 높아집니다",
				decreaseText:
					"BMI 지수가 너무 낮으면 저체중으로 인해 월경 불순, 영양실조, 면역력 약화, 영양 결핍 등이 나타날 수 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"식사는 거르지 말고 단백질과 섬유질 위주로 구성하세요",
						"천천히 먹고 생활 리듬을 일정하게 유지하세요",
						"유산소와 근력운동을 함께 실천해 체성분 균형을 유지하세요",
					],
				},
				source: "건강보험공단, 차병원",
			},
		],
	},

	/** ================= 혈압 검사 ================= */
	"blood-pressure": {
		sections: [
			{
				key: "systolicBp",
				title: "수축기 혈압",
				description:
					"심장이 수축해 혈액을 밀어낼 때 혈관에 순간적으로 가해지는 압력",
				range: {
					type: "common",
					value: {
						normal: "120 미만",
						borderline: "120~139",
						suspicious: "140 이상",
					},
				},
				increaseText:
					"수축기 혈압이 높으면 고혈압 상태로 심근경색, 뇌졸중 등 심뇌혈관 질환 위험이 증가합니다",
				decreaseText:
					"수축기 혈압이 지나치게 낮으면 주요 장기에 혈액 공급이 부족해 어지러움·실신 등의 위험이 나타날 수 있습니다",
				habitGuide: {
					type: "group",
					groups: [
						{
							title: "고혈압",
							items: [
								"나트륨을 줄이고 과일·채소·저지방 유제품 위주의 식사가 도움됩니다",
								"규칙적인 유산소 및 근력운동은 수축기 혈압을 낮추는 데 효과적입니다",
							],
						},
						{
							title: "저혈압",
							items: [
								"충분한 수분 섭취와 규칙적인 식사는 혈압 유지에 도움됩니다",
								"갑작스러운 자세 변화는 피하는 것이 좋습니다",
							],
						},
					],
				},
				source: "질병관리청 국가건강정보포털",
				showDivider: true,
			},
			{
				key: "diastolicBp",
				title: "이완기 혈압",
				description:
					"심장이 이완된 상태에서 다음 박동을 준비하는 동안 혈관에 유지되는 압력",
				range: {
					type: "common",
					value: {
						normal: "80 미만",
						borderline: "80~90",
						suspicious: "90 이상",
					},
				},
				increaseText:
					"이완기 혈압이 높으면 심장이 쉬는 동안에도 압력이 높아 혈관 손상 및 심혈관 질환 위험이 커질 수 있습니다",
				decreaseText:
					"이완기 혈압이 낮으면 혈액 공급이 원활하지 않아 어지러움·피로감이 나타날 수 있습니다",
				habitGuide: {
					type: "group",
					groups: [
						{
							title: "고혈압",
							items: [
								"짠 음식 섭취를 줄이고 절주하는 것이 도움됩니다",
								"하루 30분 정도의 걷기와 같은 신체활동만으로도 혈압이 낮아질 수 있습니다",
							],
						},
						{
							title: "저혈압",
							items: [
								"수분을 충분히 섭취하고, 장시간 서 있는 상황은 피하세요",
								"증상이 있을 경우 휴식을 취하며 몸 상태를 확인하는 것이 필요합니다",
							],
						},
					],
				},
				source: "질병관리청 국가건강정보포털",
			},
		],
	},

	/** ================= 당뇨 검사 ================= */
	diabetes: {
		sections: [
			{
				key: "fastingGlucose",
				title: "공복 혈당",
				description: "8시간 이상 공복 상태에서 측정한 혈액 속 포도당 농도",
				range: {
					type: "common",
					value: {
						normal: "100 미만",
						borderline: "100~125",
						suspicious: "126 이상",
					},
				},
				increaseText:
					"혈당 조절 기능이 저하된 상태로, 당뇨병 전단계 또는 당뇨병으로 진행될 가능성이 있습니다\n\n혈당 관리가 잘 되지 않을 경우 심혈관 질환, 신경 손상, 신장 기능 저하 등의 합병증 위험이 커질 수 있습니다",
				decreaseText:
					"공복 혈당이 정상보다 지나치게 낮은 경우(특히 70 mg/dL 미만)는 저혈당 위험이 있습니다\n\n체내 에너지원 부족으로 어지러움, 식은땀, 집중력 저하 등의 증상이 나타날 수 있습니다",
				habitGuide: {
					type: "group",
					groups: [
						{
							title: "당뇨",
							items: [
								"꾸준한 유산소 운동은 혈당을 낮추는 데 도움됩니다",
								"규칙적인 식사를 유지하고 당류를 줄인 식단을 실천하세요",
								"채소·통곡물 등 식이섬유가 풍부한 음식은 혈당 상승을 완만하게 합니다",
							],
						},
						{
							title: "저혈당",
							items: [
								"식사를 거르지 말고, 일정한 시간에 나누어 드세요",
								"공복이 길어지지 않도록 필요 시 간단한 간식을 챙기세요",
								"과도한 운동이나 음주는 저혈당을 유발할 수 있어 주의가 필요합니다",
							],
						},
					],
				},
				source: "질병관리청 건강정보포털",
			},
		],
	},

	/** ================= 간장질환 검사 ================= */
	liver: {
		sections: [
			{
				key: "ast",
				title: "에이에스티(AST)",
				description:
					"간, 심장, 근육 등 여러 조직의 세포 안에 들어 있는 아스파라긴산 분해효소",
				range: {
					type: "common",
					value: {
						normal: "40 이하",
						borderline: "41~50",
						suspicious: "51 이상",
					},
				},
				increaseText:
					" 간세포가 손상되어 효소가 혈액으로 빠져나왔다는 신호로 간염, 지방간, 간경변 등을 의심할 수 있습니다\n\n간 이외에도 심장·근육 등 여러 조직에도 존재하므로 전체적인 맥락에서 해석이 필요합니다",
				decreaseText:
					"정상 또는 낮은 AST는 특별한 위험을 의미하지 않으며, 정상 범위 안에 있으면 간세포 손상 위험이 낮다는 신호로 볼 수 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"단백질·채소 중심의 균형 잡힌 식사가 도움됩니다",
						"적정 체중을 유지가 간 부담을 줄입니다",
						"약물·보조제 복용 시 간 부담 여부를 확인하세요",
					],
				},
				source: "질병관리청 국가건강정보포털",
				showDivider: true,
			},
			{
				key: "alt",
				title: "에이엘티(ALT)",
				description:
					"주로 간세포에 존재하며 간세포 손상 시 혈액으로 증가하는 알라닌아미노 분해효소 ",
				range: {
					type: "common",
					value: {
						normal: "35 이하",
						borderline: "36~45",
						suspicious: "46 이상",
					},
				},
				increaseText:
					"간세포 손상이 있을 때 혈중 농도가 상승하여 간 질환 위험을 의심할 수 있습니다",
				decreaseText:
					"정상 범위 내 낮은 ALT는 간세포 손상이 없거나 간 건강이 비교적 양호함을 시사합니다\n\n급성·말기 간질환에서는 오히려 ALT 수치가 감소할 수도 있으므로 전체적인 맥락에서 해석이 필요합니다",
				habitGuide: {
					type: "list",
					items: [
						"과일·채소 같은 항산화 영양소를 섭취하세요",
						"충분한 수분 섭취와 수면을 유지하세요",
						"꾸준한 걷기와 같은 유산소 운동이 ALT 감소에 도움됩니다",
					],
				},
				source: "질병관리청 국가건강정보포털",
				showDivider: true,
			},
			{
				key: "gammaGtp",
				title: "감마지티피(γ-GTP)",
				description: "간과 담즙이 지나가는 쓸개관 세포에 존재하는 효소",
				range: {
					type: "sex",
					MALE: {
						normal: "11~63",
						borderline: "64~77",
						suspicious: "78 이상",
					},
					FEMALE: {
						normal: "8~35",
						borderline: "36~45",
						suspicious: "46 이상",
					},
				},
				increaseText:
					"간이나 담도에 이상이 있을 때 증가하며, 음주·과체중·약물 복용에 의해서도 수치가 상승할 수 있습니다\n\n단독으로 높은 경우에는 음주 영향 가능성이 큽니다",
				decreaseText:
					"수치가 낮거나 정상 범위인 경우, 간과 담도에 부담이 크지 않다는 의미로 해석할 수 있습니다\n\n일반적으로 수치 감소 자체는 임상적 의미가 크지 않습니다",
				habitGuide: {
					type: "list",
					items: [
						"절주 또는 금주가 감마지티피 정상화에 가장 도움됩니다",
						"체중 관리, 저지방·저당 식단과 함께 규칙적 운동으로 지방간 예방이 중요합니다",
						"간독성 약물·보조제는 의료진 상담 후 복용하세요",
					],
				},
				source: "질병관리청 국가건강정보포털",
			},
		],
	},

	/** ================= 신장질환 검사 ================= */
	kidney: {
		sections: [
			{
				key: "serumCreatinine",
				title: "혈청 크레아티닌",
				description: "근육 활동으로 인해 생긴 노폐물의 혈중 농도",
				range: {
					type: "common",
					value: {
						normal: "1.5 이하",
						suspicious: "1.5 초과",
					},
				},
				increaseText:
					"신장에서 노폐물을 걸러내는 기능이 저하된 상태로 신장 기능 저하, 탈수, 근육량 증가 등의 영향으로 수치가 높아질 수 있습니다",
				decreaseText:
					"근육량이 적거나 영양 상태가 부족한 상태로 고령자, 저체중 상태에서 낮게 측정되는 경우가 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"충분한 수분을 섭취와 짠 음식 줄이기로 신장 부담을 줄이세요",
						"단백질을 포함한 균형 잡힌 식사와 적절한 근력 활동이 도움됩니다",
					],
				},
				source: "질병관리청 건강정보포털",
				showDivider: true,
			},
			{
				key: "egfr",
				title: "신사구체여과율",
				description: "신장의 사구체에서 혈액이 여과되어 걸러지는 양",
				range: {
					type: "common",
					value: {
						normal: "60 이상",
						suspicious: "60 미만",
					},
				},
				increaseText:
					"일시적으로 높게 측정되는 경우는 수분 상태나 개인차에 따른 변화일 수 있으며, 대부분 임상적 의미는 크지 않습니다",
				decreaseText:
					"콩팥의 혈액 여과 기능이 저하된 상태를 의미하며, 수치가 낮을수록 만성 신장질환 위험이 높아질 수 있습니다\n\n나이가 들수록, 체중이 적을수록, 혈청크레아티닌 수치가 높을수록 신사구체여과율이 낮아지는 경향이 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"염분 섭취를 줄이고 충분한 수분을 섭취하세요",
						"규칙적인 신체 활동과 혈압·혈당 관리는 신장 기능 보호에 도움됩니다",
					],
				},
				source: "질병관리청 건강정보포털",
			},
		],
	},

	/** ================= 빈혈 검사 ================= */
	anemia: {
		sections: [
			{
				key: "hemoglobin",
				title: "혈색소",
				description: "혈액 속에서 산소를 운반하는 단백질",
				range: {
					type: "sex",
					MALE: {
						normal: "13.0~16.5",
						borderline: "12.0~12.9",
						suspicious: "12.0 미만 또는 16.6 이상",
					},
					FEMALE: {
						normal: "12.0~15.5",
						borderline: "10.0~11.9",
						suspicious: "10.0 미만 또는 15.6 이상",
					},
				},
				increaseText:
					"혈색소 수치가 증가하면 혈액이 농축된 상태가 될 수 있으며, 혈액 순환에 부담이 생길 수 있습니다\n\n두통, 어지러움, 얼굴 홍조, 피로감 같은 증상이 동반될 수 있습니다",
				decreaseText:
					"빈혈로 인해 체내 산소 공급이 원활하지 않을 수 있습니다.\n\n일상생활에서 쉽게 피로해지거나 무력감을 느끼고, 운동 시 호흡곤란이 나타날 수 있습니다",
				habitGuide: {
					type: "list",
					items: [
						"균형 잡힌 식사로 철분·단백질·비타민이 풍부한 식품을 섭취하세요",
						"규칙적인 신체활동은 혈액순환과 적혈구 생성에 도움됩니다",
						"적절한 수분 섭취와 금연·절주를 통해 혈액이 과도하게 농축되는 것을 방지하세요",
					],
				},
				source: "질병관리청 건강정보포털",
			},
		],
	},
};
