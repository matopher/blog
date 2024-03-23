<?php $__env->startSection('body'); ?>
    <div class="p-8">
        <h1 class="text-3xl font-bold">Hello world!</h1>
        <p> <?php echo e($page->contact_email); ?> </p>
        <p> <?php echo e($page->remotePets->last()->name); ?> </p>
        <?php echo e(dd($page->sanityArticles)); ?>

    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('_layouts.main', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/mattwoods/code/blog/source/index.blade.php ENDPATH**/ ?>