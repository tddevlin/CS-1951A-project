setwd("~/Documents/Spring2016/DataScience/FinalProject")
fulldata <- read.csv("final_nfl.csv", header=TRUE)

fulldata[mapply(is.infinite, fulldata)] <- NA #recode infinite values as NA

library(ggplot2)
library(grid)
library(gridExtra)

bgFill = "#F8F8F8"
ptFill = "#53C4C7"
textFill = "#6D6E71"
alphaLevel = 0.3

#Pick vs. Combine Results
g1 <- ggplot(fulldata, aes(x=Height, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill))
g2 <- ggplot(fulldata, aes(x=Weight, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill))
g3 <- ggplot(fulldata, aes(x=Yd40, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="40 Yard Dash")
g4 <- ggplot(fulldata, aes(x=Vertical, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Vertical Jump")
g5 <- ggplot(fulldata, aes(x=Bench, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Bench Press")
g6 <- ggplot(fulldata, aes(x=Broad, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank()) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Broad Jump")
g7 <- ggplot(fulldata, aes(x=Cone3, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Three Cone Drill")
g8 <- ggplot(fulldata, aes(x=Shuttle, y=Pick)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Shuttle Run")
grid.arrange(g1, g2, g3, g4, g5, g6, g7, g8, nrow=2)

#CareerAV vs. Combine results
g_1 <- ggplot(fulldata, aes(x=Height, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(y="CareerAV")
g_2 <- ggplot(fulldata, aes(x=Weight, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill))
g_3 <- ggplot(fulldata, aes(x=Yd40, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="40 Yard Dash")
g_4 <- ggplot(fulldata, aes(x=Vertical, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Vertical Jump")
g_5 <- ggplot(fulldata, aes(x=Bench, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Bench Press", y="CareerAV")
g_6 <- ggplot(fulldata, aes(x=Broad, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank()) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Broad Jump")
g_7 <- ggplot(fulldata, aes(x=Cone3, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Three Cone Drill")
g_8 <- ggplot(fulldata, aes(x=Shuttle, y=CarAVPerSeason)) + geom_point(color=ptFill, alpha=alphaLevel) + theme(axis.title.y = element_blank(), axis.text.y = element_blank(), axis.ticks.y = element_blank(), panel.background = element_rect(fill = bgFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(x="Shuttle Run")
grid.arrange(g_1, g_2, g_3, g_4, g_5, g_6, g_7, g_8, nrow=2)