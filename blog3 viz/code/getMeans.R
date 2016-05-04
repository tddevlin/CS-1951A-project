library(dplyr)
setwd("Documents/School/Brown/CSCI1951a/project/blog3 viz/")
dat = read.csv("../data/final_nfl.csv")
minVal = 0
# 0-1 normalization
normalize = function(x) {
    (x - min(x, na.rm = T))/(max(x, na.rm = T) - min(x, na.rm = T))
}
# invert scores where less => better
invertTimes = function(x) { 1 - x }
# desired viz order
ordering = c("QB", "WR", "RB","FB",
             "OT", "OG", "C", "TE",
             "OLB","ILB","DE","DT",
             "CB", "SS", "FS","LS",
             "P",  "K")

avedat = dat %>%
    group_by(Pos) %>%
    select(Yd40:Shuttle) %>%
    summarize_each(funs(mean(., na.rm = T))) %>%
    mutate_each(funs(normalize), Yd40:Shuttle) %>%
    mutate_each(funs(invertTimes), c(Yd40, Cone3, Shuttle)) %>%
    slice(match(ordering, Pos))
    
# set NaNs to 0
avedat[17,6:7] = c(minVal,minVal)
avedat[18,6:7] = c(minVal,minVal)

# top 10 players
topdat = dat %>%
    select(Pos, Yd40:Shuttle, CarAVPerSeason) %>%
    filter(CarAVPerSeason < Inf, !is.na(CarAVPerSeason)) %>%
    group_by(Pos) %>%
    top_n(n = 5, wt = CarAVPerSeason) %>%
    summarize_each(funs(mean(., na.rm = T))) %>%
    mutate_each(funs(normalize), Yd40:Shuttle) %>%
    mutate_each(funs(invertTimes), c(Yd40, Cone3, Shuttle)) %>%
    slice(match(ordering, Pos))

# set NaNs to 0
topdat[1,4] = rep(minVal,1)
topdat[16,3] = rep(minVal,1)
topdat[16,5:7] = rep(minVal,3)
topdat[17,6:7] = rep(minVal,2)
topdat[18,3:7] = rep(minVal,5)

write.csv(avedat, "../data/summarizedAveData.csv", row.names = F)
write.csv(topdat, "../data/summarizedTopData.csv", row.names = F)
