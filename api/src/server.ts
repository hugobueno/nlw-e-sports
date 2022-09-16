import express, { urlencoded } from "express";
const PORT = process.env.PORT || 3001
const app = express()
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from "./utils/convert-hours-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";
const prisma = new PrismaClient({
    log: ["query"]
})

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return res.json(games)
})

app.post("/games/:id/ads", async (req, res) => {

    const gameID = req.params.id
    const {
        name,
        yearsPlaying,
        discord,
        weekDays,
        horsStart,
        horsEnd,
        useVoiceChannel,
    } = req.body

    const createdAd = await prisma.ad.create({
        data: {
            gameId: gameID,
            name,
            yearsPlaying,
            discord,
            weekDays: weekDays.join(","),
            horsStart : convertHoursStringToMinutes(horsStart),
            horsEnd: convertHoursStringToMinutes(horsEnd),
            useVoiceChannel,
        }
    })
    return res.json(createdAd)
})

app.get("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id
    const ads = await prisma.ad.findMany({
        where: {
            gameId: gameId
        },
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            horsStart: true,
            horsEnd: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            horsStart: convertMinutesToHourString(ad.horsStart),
            horsEnd: convertMinutesToHourString(ad.horsEnd)
        }
    }))
})

app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id
    console.log(adId);
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        },
    })

    return res.json(ad)
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})