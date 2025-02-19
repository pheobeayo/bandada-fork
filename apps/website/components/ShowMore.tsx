"use client"

import { ReactNode, useState } from "react"
import { Button } from "./elements/Button"
import { Icons } from "./elements/Icons"
import { cn } from "@/common/utils"
import useSettings from "@/hooks/useSettings"
import { LABELS } from "@/shared/labels"
import { Divider } from "./elements/Divider"

const DEFAULT_ITEMS_TO_SHOW = 6
interface ShowMoreProps {
    children: ReactNode[]
    defaultItemsToShow?: number
    className?: string
}

function ShowMore({ children, className, defaultItemsToShow }: ShowMoreProps) {
    const { isMobile, isTablet } = useSettings()
    const [isOpen, setIsOpen] = useState(false)

    defaultItemsToShow = isTablet ? 4 : isMobile ? 2 : DEFAULT_ITEMS_TO_SHOW

    const itemsToShow = isOpen
        ? children
        : children.slice(0, defaultItemsToShow)

    const canShowMore = children.length > defaultItemsToShow

    return (
        <div className="flex flex-col gap-14">
            <div className={className ?? ""}>
                {itemsToShow?.map((child, index) => (
                    <div key={index}>{child}</div>
                ))}
            </div>
            {canShowMore && (
                <div className="relative flex">
                    <Divider.Line
                        color="dark"
                        className="absolute h-[1px] w-full top-1/2"
                    />
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mx-auto border border-baltic-sea-800"
                        color="black"
                        size="xs"
                        icon={
                            <Icons.ArrowDown
                                className={cn("duration-200", {
                                    "transform rotate-180": isOpen
                                })}
                            />
                        }
                    >
                        <span className="text-base font-medium">
                            {isOpen
                                ? LABELS.COMMON.SHOW_LESS
                                : LABELS.COMMON.SHOW_MORE}
                        </span>
                    </Button>
                </div>
            )}
        </div>
    )
}

ShowMore.displayName = "ShowMore"

export { ShowMore }
