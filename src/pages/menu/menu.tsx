import MenuBg from "@shared/assets/img/menu-bg.png";
import { Ai } from "@shared/assets/svg";
import CardList from "@shared/ui/cards/card-list";
import { Header } from "@shared/ui/navigations/header";

const menuList = [
	"저퓨린식",
	"당뇨식",
	"고혈압식",
	"소화불량식",
	"골다공증식",
	"고지혈증식",
	"저퓨린식",
	"당뇨식",
	"고혈압식",
	"소화불량식",
	"골다공증식",
	"고지혈증식",
	"저퓨린식",
	"당뇨식",
	"고혈압식",
	"소화불량식",
	"골다공증식",
	"고지혈증식",
] as const;

type MenuValue = (typeof menuList)[number];

export const MenuPage = () => {
	const handleMenuClick = (menu: MenuValue) => {
		// TODO: 라우팅 연결
	};

	return (
		<div className="w-[37.5rem] h-[81.2rem] bg-white flex flex-col overflow-hidden">
			{/* fixed header */}
			<Header title="건강 식단" isBackVisible />

			{/* scroll 영역 */}
			<div className="flex-1 overflow-y-auto bg-gray-50 pt-[5.6rem]">
				<div className="h-[1.6rem]" />

				<section className="px-[2rem]">
					<div
						className="relative min-h-[12.7rem] rounded-[1.6rem] px-[1.6rem] py-[1.4rem] overflow-hidden"
						style={{
							backgroundImage: `url(${MenuBg})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<p className="head04-m-16 text-gray-900">
							“두부전” 요리는 어떠세요?
						</p>

						<div className="mt-[1.2rem] flex items-start gap-[1rem]">
							<Ai className="shrink-0" aria-hidden />
							<p className="body03-r-14 text-gray-700">
								이러쿵 저러쿵 내용입니다. 길이는 마구 길어져도 상관 없습니다.
								(min127px)
							</p>
						</div>
					</div>
				</section>

				<section className="px-[2rem] mt-[1.6rem] pb-[2rem]">
					<div className="flex flex-col gap-[1.2rem]">
						{menuList.map((menu) => (
							<CardList key={menu} more onClick={() => handleMenuClick(menu)}>
								{menu}
							</CardList>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};
