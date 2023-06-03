// Copyright (c) 2023, Aysha and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Panchayat Test", {
// 	// refresh(frm) {

// 	// },
//     category: frm =>{
//         let category = frm.doc.category,
//             choices= []
//         console.log(category)

//         if (category == 'Fruits'){
//             choices = ['Apple', 'Mango', 'Orange']
//         } else if (category == 'Vegetables'){
//             choices = ['Potato', 'Beets', 'Cauliflower']
//         }
//         // }
        
//         console.log(choices)

//         frm.set_df_property('options', 'options', choices);
//         // frappe.ui.form.set_options(optionsField.df, choices);
//         frm.options.refresh()

//     }

// });


frappe.ui.form.on("Panchayat Test", {
	// refresh(frm) {

	// },
    category: frm =>{
        let category = frm.doc.category,
            choices= []
        console.log(category)

        let obj = {
            Fruits: ['Apple', 'Mango', 'Orange'],
            Vegetables: ['Potato', 'Beets', 'Cauliflower']
        }
      
        category!='' ? choices = obj[category] : choices=[]

        frm.set_df_property('options', 'options', choices);
        frm.options.refresh()

    }

});



