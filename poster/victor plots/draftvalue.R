# data load, clean
nfl <- read.csv("drafts2015-1999.csv", stringsAsFactors=FALSE)
nfl$Seasons <- nfl$LastYearInLeague - nfl$Year
nfl$CarAVPerSeason <- nfl$CarAV/nfl$Seasons
junk <- nfl$CarAVPerSeason
junk[is.na(junk)] <- 0
junk[junk == Inf] <- 0
junk[junk == -Inf] <- 0
nfl$CarAVPerSeason <- junk

# table average CarAV/Season for each draft pick position
avg.per.pick.tab <- tapply(nfl$CarAVPerSeason, nfl$Pick, mean, na.rm = T)
avg.per.pick <- as.vector(avg.per.pick.tab)
#cut off last pick at number 256
avg.per.pick <- avg.per.pick[1:256]

#log(avg) to transform for a linear regression
log.avg.per.pick <- log(avg.per.pick)
pick.no <- 1:length(log.avg.per.pick)

# correlation between log(avg) and pick number
cor(log.avg.per.pick,pick.no)

# run linear regression, plot
lm.value <- lm(log.avg.per.pick~pick.no)
plot(pick.no, log.avg.per.pick)
abline(lm.value, col = "red")
summary(lm.value)

# plot 
predicted.values <- predict(lm.value, as.data.frame(pick.no))
predicted.values <- exp(predicted.values)
plot(pick.no, avg.per.pick, pch = 20, cex = 0.9, xlab = "Pick Number", ylab = "Average CarAV/Season", main = "Average Draft Pick Value")
points(pick.no, predicted.values, pch = 20, cex = 0.5, col = "red")

bgFill = "#F8F8F8"
ptFill = "#53C4C7"
textFill = "#6D6E71"
alphaLevel = 1

df = data.frame(pick.no, avg.per.pick, predicted.values)

g_1 <- ggplot(df, aes(x=pick.no, y=avg.per.pick)) + geom_point(color="#585858", alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(y="Average CarAV/Season", x = "Pick Number")
g_1 +  geom_point(data = df, aes(x=pick.no, y=predicted.values), color=ptFill, alpha=alphaLevel)

#export to csv for table
csv.value <- cbind.data.frame(pick.no,predicted.values)
write.csv(csv.value, file = "draftvalue.csv", row.names = F)

#plot jimmy johnson comparison, draftvalues_compare.csv is in the google drive
jj <- read.csv("draftvalues_compare.csv", stringsAsFactors=FALSE)
jj$pick.no <- 1:length(jj$our.values)

plot(jj$pick.no, jj$our.values, pch = 20, ylim = c(0, 3000), main = "Comparing Draft Pick Valuation Systems", xlab = "Pick Number", ylab = "Value")
points(jj$pick.no[1:224], jj$jjs.values[1:224], pch = 20, col = "red")
legend(200, 3000, c("Ours", "Jimmy\nJohnson's"), bty = "n", lty = c(1,1), lwd = 4, col = c("black", "red"))

newdf = data.frame(jj$pick.no, jj$our.values, jj$jjs.values)

g_1 <- ggplot(newdf, aes(x=jj.pick.no, y=jj.jjs.values)) + geom_point(color="#585858", alpha=alphaLevel) + theme(panel.background = element_rect(fill = bgFill), axis.title.y = element_text(size = rel(1.5), color = textFill), axis.title.x = element_text(size = rel(1.5), color = textFill)) + labs(y="Value", x = "Pick Number")
g_1 +  geom_point(data = newdf, aes(x=jj.pick.no, y=jj.our.values), color=ptFill, alpha=alphaLevel)



