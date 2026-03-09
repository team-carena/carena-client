export interface HospitalItem {
	id: number;
	hospitalName: string;
	address: string;
	checkupItems: string[];
}

const hospitalNames = [
	"강남 건강검진센터",
	"서울 메디컬 검진의원",
	"튼튼병원",
	"연세 건강의학과",
	"한빛검진센터",
	"우리종합병원",
	"밝은미래의원",
	"성심건강센터",
	"온누리병원",
	"행복메디센터",
	"프라임건강검진센터",
	"서울바른검진센터",
	"하늘메디컬의원",
	"중앙검진병원",
	"메디케어 건강센터",
	"정다운검진의원",
	"스마트건강검진센터",
	"더좋은병원",
	"동행건강의원",
	"미래종합검진센터",
	"서울웰니스병원",
	"굿케어의원",
	"행복플러스병원",
	"프렌즈검진센터",
	"좋은아침의원",
	"한결건강검진센터",
	"케어메디의원",
	"청담건강의학과",
	"스마일검진센터",
	"서울라이프병원",
];

const districts = [
	"강남구",
	"서초구",
	"송파구",
	"마포구",
	"성북구",
	"종로구",
	"동대문구",
	"노원구",
	"강북구",
	"은평구",
	"중랑구",
	"영등포구",
	"강서구",
	"구로구",
	"관악구",
	"서대문구",
	"용산구",
	"광진구",
	"강동구",
	"금천구",
];

const checkupPool = [
	"기본 검사",
	"혈압 검사",
	"당뇨 검사",
	"간장질환 검사",
	"신장질환 검사",
	"빈혈 검사",
];

const getRandomItems = () => {
	const count = Math.floor(Math.random() * 3) + 2;
	const shuffled = [...checkupPool].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

export const MOCK_HOSPITALS: HospitalItem[] = Array.from(
	{ length: 150 },
	(_, i) => {
		const district = districts[i % districts.length];

		return {
			id: i + 1,
			hospitalName: `${hospitalNames[i % hospitalNames.length]} ${
				Math.floor(i / hospitalNames.length) + 1
			}`,
			address: `서울특별시 ${district} ${Math.floor(Math.random() * 300) + 1}`,
			checkupItems: getRandomItems(),
		};
	},
);
