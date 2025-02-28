---
title: Autopsy
template: doc
hero: 
    title: Autopsy
    tagline: > 
        an open source digital forensics platform that analyzes hard drives, smart phones, media cards, etc.
---

Before diving into Autopsy and analysing data, there are a few steps to perform; such as identifying the data source and what Autopsy actions to perform with the data source. 

Basic workflow:

1. Create/open the case for the data source you will investigate
2. Select the data source you wish to analyse
3. Configure the ingest modules to extract specific artefacts from the data source
4. Review the artefacts extracted by the ingest modules
5. Create the report

## Case Analysis 



### Create a New Case

To prepare a new case investigation, you need to create a case file from the data source. When you start Autopsy, there will be three options. You can create a new case file using the "New Case" option. Once you click on the "New Case" option, the Case Information menu opens, where information about the case is populated.

- **Case Name**: The name you wish to give to the case
- **Base Directory**: The root directory that will store all the files specific to the case (the full path will be displayed)
- **Case Type**: Specify whether this case will be local (Single-user) or hosted on a server where multiple analysts can review (Multi-user)

![Autopsy - Create a new case](https://tryhackme-images.s3.amazonaws.com/user-uploads/6131132af49360005df01ae3/room-content/e488c3548327c1bd78aff63060e2d2a9.png)

### Open an Existing Case

The Autopsy can also open prebuilt case files. Note that supported data sources are discussed in the next task. This part aims to show how to create/open case files with Autopsy.

Note: Autopsy case files have a ".aut" file extension.

In this room, you will import a case. To open a case, select the "Open Case" option. Navigate to the case folder (located on the desktop) and select the .aut file you wish to open. Next, Autopsy will process the case files and open the case. You can identify the name of the case at the top left corner of the Autopsy window. In the image below, the name of this case is "Sample Case". 

![Autopsy - Open an existing case](https://tryhackme-images.s3.amazonaws.com/user-uploads/6131132af49360005df01ae3/room-content/e54b49da6843e66582b797a8a3553723.png)


:::note
A warning box will appear if Autopsy cannot locate the disk image. At this point, you can point to the location of the disk image it's attempting to find, or you can click NO; you can still analyse the data from the Autopsy case.
:::

## Data Sources

Autopsy can analyse multiple disk image formats. Before diving into the data analysis step, let's briefly cover the different data sources Autopsy can analyse. You can add data sources by using the "Add Data Source" button. Available options are shown in the picture below.

Supported Disk Image Formats:
- **Raw Single** (For example: *.img, *.dd, *.raw, *.bin)
- **Raw Split** (For example: *.001, *.002, *.aa, *.ab, etc)
- **EnCase** (For example: *.e01, *.e02, etc)
- **Virtual Machines** (For example: *.vmdk, *.vhd)

If there are multiple image files (e.i. E01, E02, E03, etc.) Autopsy only needs you to point to the first image file, and Autopsy will handle the rest.  

![Autopsy - Data sources](https://tryhackme-images.s3.amazonaws.com/user-uploads/6131132af49360005df01ae3/room-content/c75224413dfb9884adbdc8c5a778383d.png)


[Autopsy Wiki](https://www.aldeid.com/wiki/Autopsy)