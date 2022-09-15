
type IProps = {
    bannerUrl: string,
    title: string,
    adsCount: number,
}

const GameBanner = ({ adsCount, bannerUrl, title }: IProps) => {
    return (
        <a className='relative rounded-lg overflow-hidden' href="">
            <img src={bannerUrl} alt="" />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{title}</strong>
                <span className='text-zinc-300 text-sm block mt-1'>{adsCount} {adsCount > 1 ? "Anúncios" : "Anúncio"}</span>
            </div>
        </a>
    )
}

export default GameBanner;