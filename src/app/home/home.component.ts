import { Component, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    title = 'beerlabels';

    nameTextValue: string = "";
    alcoholTextValue: string = "";
    dateTextValue: string = "";
    ingredientsTextValue: string = "Malt, humle og gær";

    public captureScreen() {
        var data = document.getElementById('pdfContent');

        /*html2canvas(data).then(canvas => {
            const contentDataURL = canvas.toDataURL('image/png')
            var docDefinition = {
                pageSize: 'A4',
                pageMargins: 0,
                content: [
                    {
                        image: contentDataURL,
                        width: 841.89 / 2,
                        margin: 0
                    },
                    {
                        image: contentDataURL,
                        width: 741.89 / 2,
                        margin: 0
                    }]
            };

            pdfMake.createPdf(docDefinition).download();
        }*/

        /*function saveAs(uri, filename) {
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;

                //Firefox requires the link to be in the body
                document.body.appendChild(link);

                //simulate click
                link.click();

                //remove the link when done
                document.body.removeChild(link);
            } else {
                window.open(uri);
            }
        }*/

        var canvas;
        if (data.offsetWidth < 600)
            canvas = html2canvas(data, { scale: Math.floor(600 / data.offsetWidth) });
        else
            canvas = html2canvas(data);
        canvas.then(canvas => {
            /*// Few necessary setting options  
            var imgWidth = 206;
            var pageHeight = 241;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
 
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('output.pdf'); // Generated PDF*/
            /*var width;
            var height;
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
            const contentDataURL = canvas.toDataURL('image/png', width = canvas.width, height = canvas.height)
            var position = 0;
            console.log(pdf.internal.pageSize.getWidth())
            var pageWidth = (pdf.internal.pageSize.getWidth() + 100) / 2;
            console.log(pageWidth);
            pdf.addImage(contentDataURL, 'PNG', 0, 0, pageWidth, pageWidth * (height / width))
            pdf.addImage(contentDataURL, 'PNG', pageWidth, 0, pageWidth, pageWidth * (height / width))
            //pdf.addImage(contentDataURL, 'PNG', 0, 0, pageWidth + 100, pdf.internal.pageSize.getHeight() )
            pdf.save('output.pdf'); // Generated PDF  */

            /*saveAs(canvas.toDataURL(), 'canvas.png');
            return;*/

            var width;
            var height;
            let pdf = new jspdf('p', 'pt', [595.28, 841.89]); // A4 size page of PDF  
            const contentDataURL = canvas.toDataURL('image/png', width = canvas.width, height = canvas.height)
            var expectedWidth = 595.28;
            var expectedHeight = 841.89;
            //pdf.addImage(contentDataURL, 'PNG', 0, 0, expectedWidth, expectedHeight);
            for (var i = 0; i < 5; i++) {
                var calcHeight = expectedWidth / 2 * (height / width);
                if (((i + 1) * calcHeight) > expectedHeight)
                    break;
                pdf.addImage(contentDataURL, 'PNG', 0, i * calcHeight, expectedWidth / 2, calcHeight);
                pdf.addImage(contentDataURL, 'PNG', expectedWidth / 2, i * calcHeight, expectedWidth / 2, calcHeight);
            }

            //pdf.addImage(contentDataURL, 'PNG', expectedWidth, 0, expectedWidth, expectedWidth * (height / width))
            //pdf.addImage(contentDataURL, 'PNG', 0, 0, pageWidth + 100, pdf.internal.pageSize.getHeight() )
            pdf.save('output.pdf'); // Generated PDF
        });
    }
}
