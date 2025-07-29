import {
    ContainerAnimated,
    ContainerStagger,
    GalleryGrid,
    GalleryGridCell,
} from "@/components/ui/specialgallery"
import { Button } from "@/components/ui/button"

const IMAGES = [
    "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/2.jpeg",
    "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/1.jpeg",
    "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/5.jpeg",
    "/Drnaresh.info/Padam Shri Award Nominee Dr. Naresh Kumar Chaudhary/11.jpeg",
]

const SpecialMovement = () => {
    return (
        <section >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 py-12 mt-20 md:grid-cols-2">
                <ContainerStagger>
                    <ContainerAnimated className="mb-4 block text-xs font-medium text-amber-600 md:text-sm">
                        Humanitarian Excellence
                    </ContainerAnimated>
                    <ContainerAnimated className="text-4xl font-semibold md:text-[2.4rem] tracking-tight">
                        Four Decades of Transformative Service
                    </ContainerAnimated>
                    <ContainerAnimated className="my-4 text-base text-gray-500 md:my-6 md:text-lg">
                        My life's work has been healing our planet - planting forests, cleaning the Ganga,
                        and teaching sustainable living to protect our sacred environment.
                    </ContainerAnimated>
                    <ContainerAnimated>
                        <Button className="bg-amber-600 hover:bg-amber-700">Explore His Journey</Button>
                    </ContainerAnimated>
                </ContainerStagger>

                <GalleryGrid>
                    {IMAGES.map((imageUrl, index) => (
                        <GalleryGridCell index={index} key={index}>
                            <img
                                className="size-full object-cover object-center"
                                width="100%"
                                height="100%"
                                src={imageUrl}
                                alt=""
                            />
                        </GalleryGridCell>
                    ))}
                </GalleryGrid>
            </div>
        </section>
    )
}

export default SpecialMovement;