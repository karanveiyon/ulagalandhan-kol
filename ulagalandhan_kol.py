from os import close


print("Master DNA Techscription's GIS master")
print("\n")
print("Copyrights @ Dhinakar","\n", "Latitude (N) or (S): runs across the Globe East to West () marking the points on Northern (0-90 deg) or Southern Hemisphere (0 - 90 deg).",
"\n", "Longitude (E) or (W): runs up to down on globe North to South marking the points in direction East (0 - 180 deg) or West (0 - 180 deg).")
print("\n")
print("Enter the degree,minutes,seconds in respective inputs:","\n","(After entering the values, Program will automatically convert the values into CVS .txt file which can be used in QGIS)")
print("\n")
name = input("Name of the place: ")
time = input("Number of places: ")
time = int(time)
entry = input("S.No: ")
entry = int(entry)

dorl = input("Values are alredy in Decimal?(y/n): ")
dorl = str(dorl)

utmfile= open(name+".txt","w+")
utmfile.write("name,lat,long,type\n")

if dorl == "n":
    while(entry<=time):
        site_name=input("Name of the Site: ")
        site_type=input("Type of the Site: ")

        print("Latitude (N) or (S)")
        deg1= input("Enter the Degree: ")
        mins1= input("Enter the Minutes: ")
        sec1= input("Enter the Seconds: ")

        print("Longitude (E) or (W)")
        deg2= input("Enter the Degree: ")
        mins2= input("Enter the Minutes: ")
        sec2= input("Enter the Seconds: ")

        degree1 = int(deg1)
        minutues1 = int(mins1)
        seconds1 = float(sec1)

        degree2 = int(deg2)
        minutues2 = int(mins2)
        seconds2 = float(sec2)

        def lat_decimal(x1,y1,z1):
            a1 = x1
            b1 = (y1/60)
            c1 = (z1/3600)
            dec1 = a1+b1+c1
            return dec1

        def long_decimal(x2,y2,z2):
            a2 = x2
            b2 = (y2/60)
            c2 = (z2/3600)
            dec2 = a2+b2+c2
            return dec2
        

        result= print(lat_decimal(degree1,minutues1,seconds1),long_decimal(degree2,minutues2,seconds2))
        result1= str(lat_decimal(degree1,minutues1,seconds1))
        result2 = str(long_decimal(degree2,minutues2,seconds2))   
        
        str_site_name = str(site_name)
        str_site_type = str(site_type)
        utmfile.write(str_site_name+","+result1+","+result2+","+str_site_type+"\n")
        exit = input("Enter E to Exit: ")
        if exit == "E":
            quit()
        else:    
            entry = input("S.No: ")
            entry = int(entry)

    utmfile.close()

elif dorl == "y":
    while(entry<=time):
        site_name=input("Name of the Site: ")
        site_type=input("Type of the Site: ")

        print("Latitude")
        lat_dec= input("Enter the Decimal: ")
      
        print("Longitude")
        long_dec= input("Enter the Decimal: ")
    
        result=print(lat_dec,long_dec)
        str_site_name = str(site_name)
        str_site_type = str(site_type)
        utmfile.write(str_site_name+","+lat_dec+","+long_dec+","+str_site_type+"\n")
        exit = input("Enter E to Exit: ")
        if exit == "E":
            quit()
        else:    
            entry = input("S.No: ")
            entry = int(entry)
        
        
    utmfile.close()


