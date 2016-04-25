library(dplyr)
setwd("Documents/School/Brown/CSCI1951a/project/blog2 viz/")
dat = read.csv("combine2015-1999-2.csv")
minVal = 0
# 0-1 normalization
normalize = function(x) {
    (x - min(x, na.rm = T))/(max(x, na.rm = T) - min(x, na.rm = T))
}

invertTimes = function(x) { 1 - x }

newdat = dat %>%
    group_by(Pos) %>%
    select(Yd40:Shuttle) %>%
    summarize_each(funs(mean(., na.rm = T))) %>%
    mutate_each(funs(normalize), Yd40:Shuttle) %>%
    mutate_each(funs(invertTimes), c(Yd40, Cone3, Shuttle))

# set NaNs to 0
newdat[8,6:7] = c(minVal,minVal)
newdat[10,6] = minVal
newdat[14,6:7] = c(minVal,minVal)

write.csv(newdat, "summarizedData.csv", row.names = F)

